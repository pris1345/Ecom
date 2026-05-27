const KEY = "product_demand_analytics";

// ── Category keyword map ───────────────────────────
const CATEGORIES = {
  Shoes: [
    "shoe",
    "shoes",
    "sneaker",
    "boot",
    "sandal",
    "heel",
    "footwear",
    "trainer",
  ],
  Clothing: [
    "shirt",
    "dress",
    "pants",
    "jeans",
    "jacket",
    "coat",
    "hoodie",
    "top",
    "blouse",
    "skirt",
    "shorts",
  ],
  Electronics: [
    "phone",
    "laptop",
    "tablet",
    "earphone",
    "headphone",
    "charger",
    "cable",
    "watch",
    "smartwatch",
  ],
  Accessories: [
    "bag",
    "handbag",
    "belt",
    "wallet",
    "sunglasses",
    "jewelry",
    "necklace",
    "ring",
    "bracelet",
  ],
  Beauty: [
    "cream",
    "makeup",
    "lipstick",
    "perfume",
    "skincare",
    "moisturizer",
    "serum",
    "foundation",
  ],
  Sports: [
    "gym",
    "yoga",
    "running",
    "fitness",
    "sport",
    "workout",
    "exercise",
    "bicycle",
    "swimming",
  ],
};

// ── Price interest keywords ────────────────────────
const PRICE_RANGES = {
  budget: [
    "cheap",
    "affordable",
    "budget",
    "low price",
    "inexpensive",
    "discount",
    "sale",
    "offer",
    "deal",
  ],
  mid: [
    "mid range",
    "moderate",
    "reasonable",
    "value for money",
    "decent price",
  ],
  premium: [
    "premium",
    "luxury",
    "high end",
    "expensive",
    "best quality",
    "branded",
    "designer",
  ],
};

// ── Availability keywords ──────────────────────────
const AVAILABILITY = [
  "in stock",
  "available",
  "do you have",
  "out of stock",
  "when will",
  "restock",
  "back in stock",
];

// ── Default structure ──────────────────────────────
function defaultData() {
  return {
    totalQueries: 0,
    products: {}, // { "nike air max": 5 }
    categories: {}, // { "Shoes": 12 }
    priceInterest: { budget: 0, mid: 0, premium: 0 },
    availability: [], // questions about stock
    unfulfilled: [], // bot couldn't answer
    daily: {}, // { "2025-01-01": 4 }
    sizes: {}, // { "XL": 3, "42": 2 }
    colors: {}, // { "red": 4, "black": 8 }
  };
}

// ── Load / Save ────────────────────────────────────
export function loadProductAnalytics() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : defaultData();
  } catch {
    return defaultData();
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function clearProductAnalytics() {
  localStorage.removeItem(KEY);
}

// ── Extract product keywords from a message ────────
function extractProducts(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  const found = [];

  // Look for noun phrases: adjective + noun (e.g. "blue running shoes")
  const words = lower.replace(/[^a-z0-9\s]/g, "").split(/\s+/);
  for (let i = 0; i < words.length - 1; i++) {
    const phrase = words[i] + " " + words[i + 1];
    found.push(phrase);
  }

  // Also single words that are 4+ characters
  words.filter((w) => w.length > 4).forEach((w) => found.push(w));

  return found;
}

// ── Detect category ────────────────────────────────
function detectCategories(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  const found = [];
  Object.entries(CATEGORIES).forEach(([cat, keywords]) => {
    if (keywords.some((k) => lower.includes(k))) found.push(cat);
  });
  return found;
}

// ── Detect price interest ──────────────────────────
function detectPriceRange(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  const found = [];
  Object.entries(PRICE_RANGES).forEach(([range, keywords]) => {
    if (keywords.some((k) => lower.includes(k))) found.push(range);
  });
  return found;
}

// ── Detect sizes mentioned ─────────────────────────
function detectSizes(text) {
  if (!text) return [];
  const sizePatterns = [
    /\b(xs|sm|s|m|l|xl|xxl|xxxl)\b/gi,
    /\bsize\s*(\d+\.?\d*)\b/gi,
    /\b(3[5-9]|4[0-7])\b/g, // EU shoe sizes
    /\b([3-9][0-9])\s*(eu|uk|us)\b/gi,
  ];
  const found = [];
  sizePatterns.forEach((pattern) => {
    const matches = text.match(pattern);
    if (matches) found.push(...matches.map((m) => m.toUpperCase().trim()));
  });
  return found;
}

// ── Detect colors mentioned ────────────────────────
function detectColors(text) {
  if (!text) return [];
  const colors = [
    "red",
    "blue",
    "green",
    "black",
    "white",
    "yellow",
    "pink",
    "purple",
    "orange",
    "brown",
    "grey",
    "gray",
    "navy",
    "beige",
    "gold",
    "silver",
    "cream",
  ];
  const lower = text.toLowerCase();
  return colors.filter((c) => lower.includes(c));
}

// ── Detect availability question ───────────────────
function isAvailabilityQuestion(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return AVAILABILITY.some((k) => lower.includes(k));
}

// ── Main logging function ──────────────────────────
export function logProductQuery(question, answer) {
  if (!question || !answer) return;
  const data = loadProductAnalytics();
  const today = new Date().toISOString().split("T")[0];

  data.totalQueries += 1;
  data.daily[today] = (data.daily[today] || 0) + 1;

  // Categories
  detectCategories(question).forEach((cat) => {
    data.categories[cat] = (data.categories[cat] || 0) + 1;
  });

  // Price interest
  detectPriceRange(question).forEach((range) => {
    data.priceInterest[range] += 1;
  });

  // Sizes
  detectSizes(question).forEach((size) => {
    data.sizes[size] = (data.sizes[size] || 0) + 1;
  });

  // Colors
  detectColors(question).forEach((color) => {
    data.colors[color] = (data.colors[color] || 0) + 1;
  });

  // Availability questions
  if (isAvailabilityQuestion(question)) {
    data.availability.push({ question, timestamp: new Date().toISOString() });
  }

  // Unfulfilled demand
  const botCantAnswer =
    answer.toLowerCase().includes("don't have that info") ||
    answer.toLowerCase().includes("contact our support") ||
    answer.toLowerCase().includes("not in your documents");

  if (botCantAnswer) {
    data.unfulfilled.push({ question, timestamp: new Date().toISOString() });
  }

  // Product keyword extraction (top 2-word phrases that relate to categories)
  const cats = detectCategories(question);
  if (cats.length > 0) {
    const phrases = extractProducts(question);
    phrases.slice(0, 3).forEach((phrase) => {
      if (phrase.length > 5) {
        data.products[phrase] = (data.products[phrase] || 0) + 1;
      }
    });
  }

  save(data);
}

// ── Analytics helpers ──────────────────────────────
export function getTopProducts(products, n = 8) {
  return Object.entries(products)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, count]) => ({ name, count }));
}

export function getTopCategories(categories) {
  return Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}

export function getLast7Days(daily) {
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split("T")[0];
    const label = date.toLocaleDateString("en-US", { weekday: "short" });
    result.push({ label, count: daily[key] || 0 });
  }
  return result;
}

export function getTopColors(colors, n = 6) {
  return Object.entries(colors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([color, count]) => ({ color, count }));
}

export function getTopSizes(sizes, n = 6) {
  return Object.entries(sizes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([size, count]) => ({ size, count }));
}
