import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, ArrowLeft, Plus, Minus } from "lucide-react";
import { useCart } from "../contexts/CartContext";

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
        onError={(e) => {
          e.target.src =
            "https://placehold.co/400x400/e0e7ff/4f46e5?text=No+Image";
        }}
      />
      <div className="flex-1 min-w-0">
        <span className="text-xs text-indigo-500 font-medium uppercase">
          {item.category}
        </span>
        <h3 className="font-semibold text-gray-800 dark:text-white truncate">
          {item.name}
        </h3>
        <p className="text-indigo-600 font-bold mt-1">${item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition flex items-center justify-center"
        >
          <Minus size={14} />
        </button>
        <span className="w-6 text-center font-semibold text-gray-800 dark:text-white">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition flex items-center justify-center"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="text-right min-w-[60px]">
        <p className="font-bold text-gray-800 dark:text-white">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-400 hover:text-red-600 transition mt-1 flex items-center gap-1 text-xs ml-auto"
        >
          <Trash2 size={13} /> Remove
        </button>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="text-center py-24">
      <div className="flex justify-center mb-4">
        <ShoppingCart size={64} className="text-gray-200 dark:text-gray-700" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Looks like you haven't added anything yet.
      </p>
      <Link
        to="/products"
        className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
      >
        Start Shopping
      </Link>
    </div>
  );
}

export default function CartPage() {
  const { items, totalItems, totalPrice } = useCart();

  if (items.length === 0)
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <EmptyCart />
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Your Cart
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Subtotal ({totalItems} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Shipping</span>
            <span
              className={totalPrice >= 50 ? "text-green-500 font-medium" : ""}
            >
              {totalPrice >= 50 ? "FREE" : "$9.99"}
            </span>
          </div>

          {totalPrice < 50 && (
            <p className="text-xs text-indigo-500 mb-2">
              Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
            </p>
          )}

          <div className="border-t border-gray-100 dark:border-gray-700 my-4" />

          <div className="flex justify-between font-bold text-gray-800 dark:text-white text-lg mb-6">
            <span>Total</span>
            <span>
              ${(totalPrice + (totalPrice >= 50 ? 0 : 9.99)).toFixed(2)}
            </span>
          </div>

          <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 active:scale-95 transition">
            Checkout
          </button>

          <Link
            to="/products"
            className="flex items-center justify-center gap-1 text-sm text-indigo-600 hover:underline mt-4"
          >
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
