import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Truck,
  RefreshCw,
  ShieldCheck,
  Star,
  ChevronDown,
  Check,
  ShoppingCart,
  Store,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../hooks/useProduct";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1800&fit=crop"
          alt=""
          className="w-full h-full object-cover object-center scale-105"
          style={{ animation: "slowZoom 20s ease-in-out infinite alternate" }}
        />

        {/* Left strong fade — so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />

        {/* Subtle purple tint on right side to blend with image */}
        <div className="absolute inset-0 bg-gradient-to-l from-violet-100/40 via-transparent to-transparent" />
      </div>

      {/* ── Floating blobs for depth ── */}
      <div
        className="absolute top-24 left-24 w-80 h-80 rounded-full blur-3xl z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(196,181,253,0.45), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-16 left-48 w-64 h-64 rounded-full blur-3xl z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(251,207,232,0.35), transparent 70%)",
        }}
      />

      {/* ── Floating product cards ── */}

      {/* Card 1 — top right */}
      <div
        className="absolute top-20 right-24 w-44 h-52 rounded-3xl overflow-hidden z-10 hidden lg:block shadow-2xl"
        style={{
          animation: "floatA 7s ease-in-out infinite",
          border: "1.5px solid rgba(255,255,255,0.9)",
          backdropFilter: "blur(4px)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&fit=crop"
          alt="product"
          className="w-full h-full object-cover"
        />
        {/* Glass price tag */}
        <div
          className="absolute bottom-3 left-3 right-3 py-2 px-3 rounded-xl flex justify-between items-center"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span className="text-xs font-bold text-gray-800">Headphones</span>
          <span className="text-xs font-black text-violet-600">$79</span>
        </div>
      </div>

      {/* Card 2 — mid right */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-8 w-36 h-44 rounded-3xl overflow-hidden z-10 hidden lg:block shadow-xl"
        style={{
          animation: "floatB 9s ease-in-out infinite",
          border: "1.5px solid rgba(255,255,255,0.85)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&fit=crop"
          alt="product"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute bottom-3 left-2 right-2 py-1.5 px-2.5 rounded-lg text-center"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span className="text-xs font-black text-violet-600">$59.99</span>
        </div>
      </div>

      {/* Card 3 — bottom right */}
      <div
        className="absolute bottom-28 right-52 w-32 h-32 rounded-3xl overflow-hidden z-10 hidden lg:block shadow-xl"
        style={{
          animation: "floatC 6s ease-in-out infinite",
          border: "1.5px solid rgba(255,255,255,0.85)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&fit=crop"
          alt="product"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Glass notification pill — top right ── */}
      <div
        className="absolute top-10 right-72 z-20 hidden xl:flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-lg"
        style={{
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.95)",
          animation: "floatA 10s ease-in-out infinite",
        }}
      >
        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-sm flex-shrink-0">
          ✓
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-800 leading-tight">
            Order Delivered!
          </p>
          <p className="text-xs text-gray-400">2 mins ago</p>
        </div>
      </div>

      {/* ── Glass rating pill — bottom right ── */}
      <div
        className="absolute bottom-28 right-10 z-20 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-lg"
        style={{
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.95)",
          animation: "floatC 8s ease-in-out infinite",
        }}
      >
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg
              key={s}
              className="w-3 h-3 text-yellow-400 fill-yellow-400"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
        <span className="text-xs font-semibold text-gray-700">
          4.9 · 12k reviews
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-24 w-full">
        <div className="max-w-lg">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "rgba(237,233,254,0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(196,181,253,0.6)",
              color: "#6d28d9",
              animation: "fadeUp 0.6s ease both",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse inline-block" />
            New arrivals every week
          </div>

          {/* Headline */}
          <h1
            className="text-gray-900 leading-[1.07] mb-5"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              fontWeight: 900,
              animation: "fadeUp 0.6s 0.1s ease both",
              opacity: 0,
            }}
          >
            All Items,
            <br />
            One{" "}
            <span
              style={{
                fontStyle: "italic",
                background: "linear-gradient(130deg, #7c3aed, #db2777)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Place.
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-gray-500 text-lg leading-relaxed mb-8 font-light"
            style={{
              animation: "fadeUp 0.6s 0.2s ease both",
              opacity: 0,
            }}
          >
            Explore all available products in our collection. Handpicked
            quality, fast delivery, easy returns.
          </p>

          {/* Buttons */}
          <div
            className="flex gap-3 flex-wrap mb-12"
            style={{ animation: "fadeUp 0.6s 0.3s ease both", opacity: 0 }}
          >
            <Link
              to="/products"
              className="flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
              }}
            >
              Browse All Products
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/auth"
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              Sign Up Free
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex gap-8 flex-wrap"
            style={{ animation: "fadeUp 0.6s 0.4s ease both", opacity: 0 }}
          >
            {[
              { num: "194+", label: "Products" },
              { num: "50k+", label: "Happy Customers" },
              { num: "4.9★", label: "Average Rating" },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col">
                <span
                  className="text-2xl font-black text-gray-900"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {num}
                </span>
                <span className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-28 z-[5] pointer-events-none"
        style={{ background: "linear-gradient(to top, #ffffff, transparent)" }}
      />

      {/* ── Keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatA {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%     { transform: translateY(-14px) rotate(1deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(-8px) translateX(0px) rotate(1deg); }
          50%     { transform: translateY(6px) translateX(-4px) rotate(-1deg); }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-12px); }
        }
        @keyframes slowZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1.12); }
        }
      `}</style>
    </section>
  );
}

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On all orders over $50" },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "30-day hassle-free returns",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    desc: "Your payment info is safe with us",
  },
];

function Features() {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[3px] text-violet-500 font-semibold mb-3">
            Why MyShop
          </p>
          <h2
            className="text-gray-900 dark:text-white"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Everything you need,
            <br />
            nothing you don't.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${color}15` }}
              >
                <Icon size={20} style={{ color }} />
              </div>

              {/* Text */}
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-base">
                {title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {desc}
              </p>

              <div
                className="mt-6 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-16"
                style={{ background: `${color}` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
        {rating}
      </span>
    </div>
  );
}

function FeaturedProducts() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState({});

  useEffect(() => {
    fetch(
      "https://dummyjson.com/products?limit=3&select=id,title,price,thumbnail,category,description,rating",
    )
      .then((r) => r.json())
      .then((data) =>
        setProducts(
          data.products.map((p) => ({
            id: p.id,
            name: p.title,
            price: p.price,
            image: p.thumbnail,
            category:
              typeof p.category === "string" ? p.category : p.category?.name,
            description: p.description,
            rating: p.rating,
          })),
        ),
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (product) => {
    addToCart(product);
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(
      () => setAdded((prev) => ({ ...prev, [product.id]: false })),
      1500,
    );
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[3px] text-violet-500 font-semibold mb-3">
              Handpicked
            </p>
            <h2
              className="text-gray-900 dark:text-white"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Featured
              <br />
              Products
            </h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors mb-1"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden animate-pulse flex flex-col gap-0"
                >
                  <div className="h-56 bg-gray-100 dark:bg-gray-800" />
                  <div className="p-5 flex flex-col gap-3 bg-white dark:bg-gray-800">
                    <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full w-1/3" />
                    <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full w-3/4" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full w-full" />
                    <div className="flex justify-between mt-1">
                      <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full w-1/4" />
                      <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-full w-1/3" />
                    </div>
                  </div>
                </div>
              ))
            : products.map((product, i) => (
                <div
                  key={product.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                  style={{
                    boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {/* Image */}
                  <Link
                    to={`/products/${product.id}`}
                    className="block relative overflow-hidden h-56 bg-gray-50 dark:bg-gray-700 flex-shrink-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      style={{ transition: "transform 0.5s ease" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/400x400/f3f0ff/7c3aed?text=No+Image";
                      }}
                    />
                    {/* Category pill over image */}
                    <span
                      className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full capitalize"
                      style={{
                        background: "rgba(255,255,255,0.88)",
                        backdropFilter: "blur(8px)",
                        color: "#7c3aed",
                      }}
                    >
                      {product.category}
                    </span>
                  </Link>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-violet-600 transition-colors text-base mb-1">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-sm text-gray-400 dark:text-gray-500 line-clamp-2 leading-relaxed flex-1">
                      {product.description}
                    </p>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-1.5 mt-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={12}
                              className={
                                s <= Math.round(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-200 dark:text-gray-600"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          {product.rating}
                        </span>
                      </div>
                    )}

                    {/* Price + button */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50 dark:border-gray-700">
                      <div>
                        <span
                          className="text-xl font-black text-gray-900 dark:text-white"
                          style={{
                            fontFamily: '"Playfair Display", Georgia, serif',
                          }}
                        >
                          ${product.price}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAdd(product)}
                        className="flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95"
                        style={
                          added[product.id]
                            ? { background: "#22c55e", color: "#fff" }
                            : {
                                background:
                                  "linear-gradient(135deg, #7c3aed, #a855f7)",
                                color: "#fff",
                                boxShadow: "0 4px 14px rgba(124,58,237,0.3)",
                              }
                        }
                      >
                        {added[product.id] ? (
                          <>
                            <Check size={14} /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={14} /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-white/5 px-4 pt-16 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                }}
              >
                <Store size={15} className="text-white" />
              </div>
              <span
                className="text-gray-900 dark:text-white text-xl font-black"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                MyShop
              </span>
            </div>

            <p className="text-gray-400 dark:text-white/30 text-sm leading-relaxed max-w-[220px]">
              Curated products, delivered fast. Quality goods at honest prices.
            </p>

            {/* Social icons */}
            <div className="flex gap-2 mt-1">
              {[
                {
                  label: "Twitter",
                  icon: (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  icon: (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(124,58,237,0.08)",
                    color: "#7c3aed",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg,#7c3aed,#a855f7)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(124,58,237,0.08)";
                    e.currentTarget.style.color = "#7c3aed";
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <p className="text-gray-900 dark:text-white text-xs font-bold uppercase tracking-widest mb-5">
              Shop
            </p>
            <div className="flex flex-col gap-3">
              {[
                "All Products",
                "Electronics",
                "Clothing",
                "Kitchen",
                "Sports",
              ].map((l) => (
                <Link
                  key={l}
                  to="/products"
                  className="text-gray-400 dark:text-white/30 text-sm hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Support links */}
          <div>
            <p className="text-gray-900 dark:text-white text-xs font-bold uppercase tracking-widest mb-5">
              Support
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Help Center",
                "Returns",
                "Shipping Info",
                "Contact Us",
                "Privacy Policy",
              ].map((l) => (
                <span
                  key={l}
                  className="text-gray-400 dark:text-white/30 text-sm cursor-default hover:text-gray-600 dark:hover:text-white/50 transition-colors"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-gray-900 dark:text-white text-xs font-bold uppercase tracking-widest mb-5">
              Stay Updated
            </p>
            <p className="text-gray-400 dark:text-white/30 text-sm leading-relaxed mb-4">
              Get new arrivals & deals straight to your inbox.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-200 dark:border-white/8 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
              <button
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-400 dark:text-white/20 text-xs">
            © 2025 MyShop. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-300 dark:text-white/15">
            {["Privacy", "Terms", "Cookies"].map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                {i > 0 && <span>·</span>}
                <span className="hover:text-gray-500 dark:hover:text-white/40 transition-colors cursor-default">
                  {l}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
      <Features />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}
