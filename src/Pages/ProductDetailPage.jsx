import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Truck,
  RefreshCw,
  ShieldCheck,
  Plus,
  Minus,
  Share2,
  Heart,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";

function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={
              star <= Math.round(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {rating}
      </span>
      {count && (
        <span className="text-sm text-gray-400">({count} reviews)</span>
      )}
    </div>
  );
}

function ImageGallery({ images, name }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden h-80 md:h-96">
        <img
          src={images[active]}
          alt={name}
          className="w-full h-full object-contain p-4 transition duration-300"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x600/e0e7ff/4f46e5?text=No+Image";
          }}
        />
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                active === i
                  ? "border-indigo-600"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/100x100/e0e7ff/4f46e5?text=?";
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function RelatedProducts({ category, currentId }) {
  const [related, setRelated] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}?limit=4`)
      .then((r) => r.json())
      .then((data) => {
        // exclude current product
        const filtered = data.products
          .filter((p) => p.id !== currentId)
          .slice(0, 3);
        setRelated(filtered);
      })
      .catch(() => {});
  }, [category, currentId]);

  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {related.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group"
          >
            <div className="overflow-hidden h-40 bg-gray-50 dark:bg-gray-700">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/400x400/e0e7ff/4f46e5?text=No+Image";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 dark:text-white text-sm line-clamp-1">
                {product.title}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-indigo-600 font-bold">
                  ${product.price}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({
                      id: product.id,
                      name: product.title,
                      price: product.price,
                      image: product.thumbnail,
                      category: product.category,
                    });
                  }}
                  className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  // How many of this item already in cart
  const inCart = items.find((i) => i.id === Number(id))?.quantity ?? 0;

  useEffect(() => {
    setLoading(true);
    setProduct(null);
    window.scrollTo(0, 0);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => setProduct(data))
      .catch(() => setError("Product not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.thumbnail,
        category: product.category,
        description: product.description,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // ── Loading skeleton ──────────────────────────────
  if (loading)
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            <div className="flex flex-col gap-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse mt-4" />
            </div>
          </div>
        </div>
      </main>
    );

  // ── Error state ───────────────────────────────────
  if (error)
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {error}
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition"
          >
            Back to Products
          </button>
        </div>
      </main>
    );

  const discount = product.discountPercentage
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-indigo-600 transition">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-white capitalize">
            {product.category}
          </span>
          <span>/</span>
          <span className="text-gray-800 dark:text-white line-clamp-1">
            {product.title}
          </span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition mb-6"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700">
          {/* Left — Image gallery */}
          <ImageGallery
            images={
              product.images?.length ? product.images : [product.thumbnail]
            }
            name={product.title}
          />

          {/* Right — Info */}
          <div className="flex flex-col gap-4">
            {/* Category + Stock */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-indigo-500 font-medium uppercase tracking-wide">
                {product.category}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  product.stock > 10
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400"
                    : product.stock > 0
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {product.stock > 10
                  ? "✓ In Stock"
                  : product.stock > 0
                    ? `Only ${product.stock} left`
                    : "Out of Stock"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <StarRating
              rating={product.rating}
              count={product.reviews?.length}
            />

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-3xl font-extrabold text-indigo-600">
                ${product.price}
              </span>
              {discount && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ${discount}
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400 px-2 py-0.5 rounded-full">
                    -{Math.round(product.discountPercentage)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Brand */}
            {product.brand && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Brand:{" "}
                <span className="font-semibold text-gray-800 dark:text-white">
                  {product.brand}
                </span>
              </p>
            )}

            <div className="border-t border-gray-100 dark:border-gray-700 my-1" />

            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity
              </span>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 flex items-center justify-center shadow-sm hover:bg-gray-50 transition"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-semibold text-gray-800 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 flex items-center justify-center shadow-sm hover:bg-gray-50 transition"
                >
                  <Plus size={14} />
                </button>
              </div>
              {inCart > 0 && (
                <span className="text-xs text-indigo-500">
                  {inCart} already in cart
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-1">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition active:scale-95 ${
                  added
                    ? "bg-green-500 text-white"
                    : product.stock === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                <ShoppingCart size={18} />
                {added
                  ? "Added to Cart!"
                  : product.stock === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
              </button>

              <button
                onClick={() => setWished((w) => !w)}
                className={`p-3 rounded-xl border transition ${
                  wished
                    ? "bg-red-50 border-red-200 text-red-500 dark:bg-red-900/30 dark:border-red-800"
                    : "border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-500 hover:border-red-200"
                }`}
              >
                <Heart
                  size={20}
                  className={wished ? "fill-red-500 text-red-500" : ""}
                />
              </button>

              <button
                onClick={() =>
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => alert("Link copied!"))
                }
                className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-indigo-600 hover:border-indigo-300 transition"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
                {
                  icon: RefreshCw,
                  label: "Easy Returns",
                  sub: "30-day policy",
                },
                {
                  icon: ShieldCheck,
                  label: "Secure Pay",
                  sub: "100% protected",
                },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-2.5"
                >
                  <Icon size={18} className="text-indigo-600 mb-1" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {label}
                  </span>
                  <span className="text-xs text-gray-400">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews section */}
        {product.reviews?.length > 0 && (
          <section className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Customer Reviews
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({product.reviews.length})
              </span>
            </h2>
            <div className="flex flex-col gap-4">
              {product.reviews.map((review, i) => (
                <div
                  key={i}
                  className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800 dark:text-white text-sm">
                      {review.reviewerName}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={13}
                        className={
                          s <= review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        <RelatedProducts category={product.category} currentId={product.id} />
      </div>
    </main>
  );
}
