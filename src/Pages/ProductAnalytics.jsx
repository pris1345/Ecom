import { useState, useEffect } from "react";
import {
  loadProductAnalytics,
  clearProductAnalytics,
  getTopProducts,
  getTopCategories,
  getLast7Days,
  getTopColors,
  getTopSizes,
} from "../hooks/useProductAnalytics";

// ── Color map for swatches ─────────────────────────
const COLOR_MAP = {
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#22c55e",
  black: "#1f2937",
  white: "#f9fafb",
  yellow: "#eab308",
  pink: "#ec4899",
  purple: "#a855f7",
  orange: "#f97316",
  brown: "#92400e",
  grey: "#6b7280",
  gray: "#6b7280",
  navy: "#1e3a5f",
  beige: "#d4b896",
  gold: "#d97706",
  silver: "#9ca3af",
  cream: "#fef9ee",
};

// ── Category color map ─────────────────────────────
const CAT_COLORS = {
  Shoes: "bg-blue-100 text-blue-700",
  Clothing: "bg-purple-100 text-purple-700",
  Electronics: "bg-amber-100 text-amber-700",
  Accessories: "bg-pink-100 text-pink-700",
  Beauty: "bg-rose-100 text-rose-700",
  Sports: "bg-green-100 text-green-700",
};

// ── CSS Bar Chart ──────────────────────────────────
function BarChart({ data, color = "#3b82f6" }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-1.5 h-32">
      {data.map((d, i) => {
        const pct = Math.round((d.count / max) * 100);
        return (
          <div key={i} className="flex flex-col items-center flex-1 gap-1">
            <span className="text-xs text-gray-400 h-4 leading-none">
              {d.count > 0 ? d.count : ""}
            </span>
            <div
              className="w-full bg-gray-100 rounded-t-md"
              style={{ height: "72px" }}
            >
              <div
                className="w-full rounded-t-md transition-all duration-500"
                style={{
                  height: `${pct}%`,
                  minHeight: d.count > 0 ? "4px" : "0",
                  backgroundColor: color,
                }}
              />
            </div>
            <span className="text-xs text-gray-400 leading-none">
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Horizontal Bar ─────────────────────────────────
function HBar({ value, max, color = "bg-blue-500" }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── Main Page ──────────────────────────────────────
export default function ProductAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(loadProductAnalytics());
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Loading...
      </div>
    );
  }

  const topProducts = getTopProducts(data.products);
  const topCategories = getTopCategories(data.categories);
  const last7Days = getLast7Days(data.daily);
  const topColors = getTopColors(data.colors);
  const topSizes = getTopSizes(data.sizes);

  const totalPriceQueries =
    data.priceInterest.budget +
      data.priceInterest.mid +
      data.priceInterest.premium || 1;

  function handleClear() {
    if (!confirm("Clear all product analytics? This cannot be undone.")) return;
    clearProductAnalytics();
    setData(loadProductAnalytics());
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Product Demand Analytics
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Based on what customers are asking your chatbot
            </p>
          </div>
          <button
            onClick={handleClear}
            className="text-xs text-red-400 border border-red-200 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            Clear data
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Total queries",
              value: data.totalQueries,
              icon: "ti-message-search",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Categories tracked",
              value: Object.keys(data.categories).length,
              icon: "ti-tag",
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
            {
              label: "Availability asked",
              value: data.availability.length,
              icon: "ti-package",
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
            {
              label: "Unfulfilled demands",
              value: data.unfulfilled.length,
              icon: "ti-alert-circle",
              color: "text-red-500",
              bg: "bg-red-50",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div
                className={`w-9 h-9 ${card.bg} rounded-lg flex items-center justify-center mb-3`}
              >
                <i
                  className={`ti ${card.icon} ${card.color}`}
                  style={{ fontSize: 18 }}
                  aria-hidden="true"
                />
              </div>
              <div className="text-2xl font-semibold text-gray-800">
                {card.value}
              </div>
              <div className="text-xs text-gray-400 mt-1">{card.label}</div>
            </div>
          ))}
        </div>

        {/* ── Row 1: demand trend + categories ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Trend — 2/3 width */}
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-medium text-gray-700 mb-4">
              Demand trend — last 7 days
            </h2>
            {data.totalQueries === 0 ? (
              <div className="h-32 flex items-center justify-center text-sm text-gray-300">
                No data yet — customers need to chat first!
              </div>
            ) : (
              <BarChart data={last7Days} color="#3b82f6" />
            )}
          </div>

          {/* Categories — 1/3 width */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-medium text-gray-700 mb-4">
              Category demand
            </h2>
            {topCategories.length === 0 ? (
              <p className="text-sm text-gray-300 text-center py-8">
                No data yet
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {topCategories.map((cat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${CAT_COLORS[cat.name] || "bg-gray-100 text-gray-600"}`}
                    >
                      {cat.name}
                    </span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400 rounded-full"
                        style={{
                          width: `${Math.round((cat.count / (topCategories[0]?.count || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Row 2: top products + price sensitivity ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Top demanded products — 2/3 */}
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-medium text-gray-700 mb-4">
              Most demanded products
            </h2>
            {topProducts.length === 0 ? (
              <p className="text-sm text-gray-300 text-center py-8">
                No product demand detected yet
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {topProducts.map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-gray-300 w-5 text-right flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 capitalize font-medium">
                        {p.name}
                      </p>
                      <HBar
                        value={p.count}
                        max={topProducts[0]?.count || 1}
                        color={
                          i === 0
                            ? "bg-blue-500"
                            : i === 1
                              ? "bg-blue-400"
                              : "bg-blue-300"
                        }
                      />
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-sm font-semibold text-gray-700">
                        {p.count}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">
                        requests
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price sensitivity — 1/3 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-medium text-gray-700 mb-4">
              Price sensitivity
            </h2>
            <div className="flex flex-col gap-4">
              {[
                {
                  label: "Budget",
                  key: "budget",
                  color: "bg-green-400",
                  badge: "bg-green-50 text-green-700",
                },
                {
                  label: "Mid",
                  key: "mid",
                  color: "bg-amber-400",
                  badge: "bg-amber-50 text-amber-700",
                },
                {
                  label: "Premium",
                  key: "premium",
                  color: "bg-purple-400",
                  badge: "bg-purple-50 text-purple-700",
                },
              ].map((tier) => {
                const count = data.priceInterest[tier.key];
                const pct = Math.round((count / totalPriceQueries) * 100);
                return (
                  <div key={tier.key}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${tier.badge}`}
                      >
                        {tier.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {count} queries
                      </span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${tier.color} rounded-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-right text-xs text-gray-300 mt-1">
                      {pct}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Row 3: colors + sizes ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Colors */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-medium text-gray-700 mb-4">
              Most requested colors
            </h2>
            {topColors.length === 0 ? (
              <p className="text-sm text-gray-300 text-center py-6">
                No color data yet
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {topColors.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200 flex-shrink-0"
                      style={{
                        backgroundColor: COLOR_MAP[c.color] || "#e5e7eb",
                      }}
                    />
                    <span className="text-sm text-gray-700 capitalize flex-1">
                      {c.color}
                    </span>
                    <HBar
                      value={c.count}
                      max={topColors[0]?.count || 1}
                      color="bg-gray-400"
                    />
                    <span className="text-xs text-gray-400 flex-shrink-0 w-8 text-right">
                      {c.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sizes */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-medium text-gray-700 mb-4">
              Most requested sizes
            </h2>
            {topSizes.length === 0 ? (
              <p className="text-sm text-gray-300 text-center py-6">
                No size data yet
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {topSizes.map((s, i) => {
                  const ratio = s.count / (topSizes[0]?.count || 1);
                  const scale =
                    ratio > 0.7
                      ? "text-lg"
                      : ratio > 0.4
                        ? "text-base"
                        : "text-sm";
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                    >
                      <span className={`${scale} font-semibold text-gray-700`}>
                        {s.size}
                      </span>
                      <span className="text-xs text-gray-400">{s.count}×</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Unfulfilled demand ── */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-medium text-gray-700">
              Unfulfilled product demand
            </h2>
            <span className="text-xs bg-red-50 text-red-400 px-2 py-0.5 rounded-full">
              stock these products
            </span>
          </div>
          {data.unfulfilled.length === 0 ? (
            <p className="text-sm text-gray-300 text-center py-6">
              No unfulfilled demands yet!
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {data.unfulfilled
                .slice(-10)
                .reverse()
                .map((q, i) => (
                  <div key={i} className="py-3 flex items-start gap-3">
                    <i
                      className="ti ti-alert-circle text-red-300 flex-shrink-0"
                      style={{ fontSize: 16, marginTop: 2 }}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700">{q.question}</p>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {new Date(q.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span className="text-xs text-blue-400 flex-shrink-0 pt-0.5 cursor-pointer hover:underline">
                      Consider stocking →
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* ── Availability requests ── */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-medium text-gray-700">
              Stock availability questions
            </h2>
            <span className="text-xs bg-amber-50 text-amber-500 px-2 py-0.5 rounded-full">
              {data.availability.length} total
            </span>
          </div>
          {data.availability.length === 0 ? (
            <p className="text-sm text-gray-300 text-center py-6">
              No availability questions yet
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {data.availability
                .slice(-8)
                .reverse()
                .map((q, i) => (
                  <div key={i} className="py-3 flex items-start gap-3">
                    <i
                      className="ti ti-package text-amber-400 flex-shrink-0"
                      style={{ fontSize: 16, marginTop: 2 }}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700">{q.question}</p>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {new Date(q.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
