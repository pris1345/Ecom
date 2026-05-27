import { useState, useEffect } from "react";
import { logProductQuery } from "./useProductAnalytics";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const DOCS_KEY = "rag_faq_documents";
const CHAT_KEY = "rag_chat_history";

// ── Chunking ───────────────────────────────────────
function chunkDocument(text, size = 200) {
  const words = text.split(" ");
  const chunks = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(" "));
  }
  return chunks;
}

// ── TF-IDF Retrieval ───────────────────────────────
function getWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3);
}

function findRelevantChunks(question, allChunks, topN = 3) {
  if (!question || !allChunks.length) return allChunks.slice(0, topN);
  const questionWords = getWords(question);
  if (!questionWords.length) return allChunks.slice(0, topN);

  const idf = {};
  questionWords.forEach((word) => {
    const count = allChunks.filter((c) =>
      c.toLowerCase().includes(word),
    ).length;
    idf[word] = count === 0 ? 0 : Math.log(allChunks.length / count);
  });

  const scored = allChunks.map((chunk) => {
    const words = getWords(chunk);
    const total = words.length || 1;
    let score = 0;
    questionWords.forEach((word) => {
      const tf = words.filter((w) => w === word).length / total;
      score += tf * (idf[word] || 0);
    });
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, topN);
  return top[0]?.score === 0
    ? allChunks.slice(0, topN)
    : top.map((i) => i.chunk);
}

// ── Storage helpers ────────────────────────────────
function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Storage save failed for ${key}:`, e);
  }
}

// ── Default welcome message ────────────────────────
const WELCOME = {
  role: "assistant",
  content:
    "Hi! I'm your support assistant. Ask me anything about our store, shipping, returns, or FAQs!",
};

// ── Main Hook ──────────────────────────────────────
export function useChatbot() {
  // load documents synchronously on first render
  const [documents, setDocuments] = useState(() =>
    loadFromStorage(DOCS_KEY, []),
  );

  // load chat history synchronously on first render
  const [messages, setMessages] = useState(() => {
    const saved = loadFromStorage(CHAT_KEY, null);
    return saved && saved.length > 0 ? saved : [WELCOME];
  });

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── Add document — saves immediately ──────────────
  function addDocument(text, name = null) {
    if (!text || !text.trim()) return;

    const chunks = chunkDocument(text);
    const newDoc = {
      name,
      chunks,
      preview: text.substring(0, 120),
    };

    // save inside the state updater — guaranteed to have latest state
    setDocuments((prev) => {
      const updated = [...prev, newDoc];
      saveToStorage(DOCS_KEY, updated); // saves immediately
      return updated;
    });
  }

  // ── Clear documents — saves immediately ───────────
  function clearDocuments() {
    localStorage.removeItem(DOCS_KEY);
    setDocuments([]);
  }

  // ── Clear chat ─────────────────────────────────────
  function clearChat() {
    localStorage.removeItem(CHAT_KEY);
    setMessages([WELCOME]);
    setHistory([]);
  }

  useEffect(() => {
    if (messages.length > 0) {
      const recent = messages.slice(-50); // keep last 50 only
      saveToStorage(CHAT_KEY, recent);
    }
  }, [messages]);

  // ── Send message ───────────────────────────────────
  async function sendMessage(question) {
    if (!question || !question.trim() || loading) return;

    const userMsg = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // build system prompt from relevant chunks
    let systemPrompt = "";

    if (documents.length > 0) {
      const allChunks = documents.flatMap((d) => d.chunks);
      const relevant = findRelevantChunks(question, allChunks, 3);

      systemPrompt =
        "You are a helpful ecommerce support assistant. " +
        "Use ONLY the following FAQ documents to answer the customer. " +
        "Be friendly, concise, and helpful. " +
        "If the answer is not in the documents say: " +
        "'I don't have that info right now — please contact our support team.'\n\n";

      relevant.forEach((chunk, i) => {
        systemPrompt += `--- Section ${i + 1} ---\n${chunk}\n\n`;
      });
    } else {
      systemPrompt =
        "You are a helpful ecommerce support assistant. " +
        "No FAQ documents have been loaded yet. " +
        "Let the customer know and offer general help.";
    }

    const newHistory = [...history, { role: "user", content: question }];

    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + API_KEY,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: systemPrompt },
              ...newHistory,
            ],
          }),
        },
      );

      const data = await res.json();
      const reply = data.choices[0].message.content;

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      setHistory([...newHistory, { role: "assistant", content: reply }]);

      logProductQuery(question, reply);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  }

  return {
    messages,
    loading,
    documents,
    sendMessage,
    addDocument,
    clearDocuments,
    clearChat,
  };
}
