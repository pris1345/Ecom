import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, SearchX, ShoppingCart, Check } from "lucide-react";
import { useProducts } from "../hooks/useProduct";
import { useCart } from "../contexts/CartContext";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={13}
          className={
            star <= Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }
        />
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating}</span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="flex justify-between mt-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group flex flex-col">
      {/* Image — clicking goes to detail page */}
      <Link
        to={`/products/${product.id}`}
        className="block overflow-hidden bg-gray-50 dark:bg-gray-700 h-48 flex-shrink-0"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x400/e0e7ff/4f46e5?text=No+Image";
          }}
        />
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-indigo-500 font-medium uppercase tracking-wide capitalize">
          {product.category}
        </span>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 dark:text-white mt-1 line-clamp-1 hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex-1 line-clamp-2">
          {product.description}
        </p>

        <StarRating rating={product.rating} />

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-indigo-600">
            ${product.price}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl transition-all active:scale-95 ${
              added
                ? "bg-green-500 text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {added ? (
              <>
                <Check size={14} /> Added!
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
  );
}

export default function ProductsPage() {
  const {
    products,
    categories,
    loading,
    loadingMore,
    error,
    loadMore,
    hasMore,
    total,
  } = useProducts();

  const [search, setSearch] = useState("");
  const [activeCategory, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Filter
  let filtered =
    activeCategory === "All"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === activeCategory?.toLowerCase(),
        );

  // Search
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q),
    );
  }

  // Sort
  const sorted = [...filtered];
  if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            All Products
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {loading
              ? "Loading products..."
              : `Showing ${products.length} of ${total} products`}
          </p>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition capitalize ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-indigo-600 hover:underline text-sm"
            >
              Try again
            </button>
          </div>
        )}

        {/* Skeleton grid while loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty search result */}
        {!loading && !error && sorted.length === 0 && (
          <div className="text-center py-24">
            <div className="flex justify-center mb-4">
              <SearchX size={56} className="text-gray-300 dark:text-gray-600" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No products found
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-4 text-indigo-600 hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && sorted.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load more */}
        {!loading && !error && hasMore && (
          <div className="flex flex-col items-center mt-10 gap-2">
            <p className="text-sm text-gray-400">
              Showing {products.length} of {total} products
            </p>
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-60 active:scale-95 transition"
            >
              {loadingMore ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Products"
              )}
            </button>
          </div>
        )}

        {/* All loaded */}
        {!loading && !error && !hasMore && products.length > 0 && (
          <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-10">
            You've seen all {total} products!
          </p>
        )}
      </div>
    </main>
  );
}
