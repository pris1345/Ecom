import { useState, useRef, useEffect } from "react";
import { useChatbot } from "../hooks/useChatbot";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [docText, setDocText] = useState("");
  const bottomRef = useRef(null);
  const fileRef = useRef(null);
  const {
    messages,
    loading,
    documents,
    sendMessage,
    addDocument,
    clearDocuments,
    clearChat,
  } = useChatbot();
  const { usedMB, pct } = getStorageUsage();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function handleSend() {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleAddDoc() {
    if (!docText.trim()) return;
    addDocument(docText, "Pasted FAQ");
    setDocText("");
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      addDocument(ev.target.result, file.name);
    };
    reader.readAsText(file);
    e.target.value = "";
  }
  function getStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage.getItem(key).length * 2;
      }
    }
    const usedMB = (total / 1024 / 1024).toFixed(2);
    const pct = Math.round((total / (5 * 1024 * 1024)) * 100);
    return { usedMB, pct };
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
        aria-label="Open support chat"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* ── Chat Window ── */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] h-[540px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="font-medium text-sm flex-1">
              Support Assistant
            </span>
            <span className="text-xs text-blue-200">
              {documents.length} doc(s) loaded
            </span>
            <button
              onClick={() => setShowAdmin((s) => !s)}
              className="text-blue-200 hover:text-white text-xs underline ml-2"
            >
              {showAdmin ? "Chat" : "Admin"}
            </button>
          </div>

          {/* ── Admin Panel ── */}
          {showAdmin ? (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Knowledge Base — {documents.length} document(s)
              </p>

              {/* Existing docs */}
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg p-3"
                >
                  <p className="text-xs font-semibold text-gray-700">
                    {doc.name || `Document ${i + 1}`}
                    <span className="font-normal text-gray-400 ml-1">
                      ({doc.chunks.length} chunks)
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 truncate mt-1">
                    {doc.preview || "No preview"}...
                  </p>
                </div>
              ))}

              {documents.length === 0 && (
                <p className="text-xs text-gray-400 text-center mt-4">
                  No documents yet. Add your FAQ below.
                </p>
              )}

              {/* Upload file */}
              <input
                ref={fileRef}
                type="file"
                accept=".txt"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                onClick={() => fileRef.current.click()}
                className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Upload .txt file
              </button>

              {/* Paste text */}
              <textarea
                value={docText}
                onChange={(e) => setDocText(e.target.value)}
                placeholder="Or paste FAQ text here..."
                className="w-full text-xs border border-gray-200 rounded-lg p-2 resize-none h-24 outline-none focus:border-blue-400 text-gray-700"
              />
              <button
                onClick={handleAddDoc}
                className="w-full py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Add to knowledge base
              </button>

              {documents.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm("Clear all documents?")) clearDocuments();
                  }}
                  className="w-full py-2 border border-red-200 text-red-400 text-xs rounded-lg hover:bg-red-50 transition-colors"
                >
                  Clear all documents
                </button>
              )}
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Storage used</span>
                  <span>{usedMB} MB / 5 MB</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${pct > 80 ? "bg-red-400" : "bg-blue-400"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {pct > 80 && (
                  <p className="text-xs text-red-400 mt-1">
                    Storage almost full — clear old documents
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* ── Messages ── */}
              <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <span className="text-[11px] text-gray-400 mb-1">
                      {msg.role === "user" ? "You" : "Assistant"}
                    </span>
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div className="flex flex-col items-start">
                    <span className="text-[11px] text-gray-400 mb-1">
                      Assistant
                    </span>
                    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* ── Input ── */}
              <div className="px-3 py-3 border-t border-gray-100 flex gap-2 items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  rows={1}
                  className="flex-1 resize-none border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 text-gray-700 max-h-28"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
