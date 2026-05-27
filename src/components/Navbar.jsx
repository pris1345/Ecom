import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Sun, Moon, Store, LogIn, Menu, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { Links } from "react-router-dom";

export default function Navbar() {
  const { totalItems } = useCart();
  const { dark, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? "text-violet-600 dark:text-violet-400"
        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
    }`;

  return (
    <>
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: dark ? "rgba(10,10,20,0.95)" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? dark
              ? "1px solid rgba(255,255,255,0.07)"
              : "1px solid rgba(0,0,0,0.07)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
            >
              <Store size={15} className="text-white" />
            </div>
            <span
              className="text-gray-900 dark:text-white font-black text-lg"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              MyShop
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/products" className={linkClass("/products")}>
              Products
            </Link>
            <Link to="/analytics" className={linkClass("/analytics")}>
              Analytics
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
                isActive("/cart")
                  ? "text-violet-600 bg-violet-50 dark:bg-violet-900/30"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
              }`}
            >
              <ShoppingCart size={17} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 text-white font-bold rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                    fontSize: "9px",
                    minWidth: "16px",
                    height: "16px",
                    padding: "0 3px",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Login — desktop only */}
            <Link
              to="/auth"
              className="hidden md:flex items-center gap-1.5 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:opacity-90 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                boxShadow: "0 4px 12px rgba(124,58,237,0.25)",
              }}
            >
              <LogIn size={14} />
              Login
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "280px" : "0px",
            borderTop: menuOpen
              ? dark
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid rgba(0,0,0,0.06)"
              : "1px solid transparent",
          }}
        >
          <div className="px-5 py-4 flex flex-col gap-1">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/cart", label: "Cart" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                  isActive(to)
                    ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                {label}
                {isActive(to) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                )}
              </Link>
            ))}

            {/* Login row in mobile */}
            <Link
              to="/auth"
              className="flex items-center justify-center gap-2 mt-2 py-3 rounded-2xl text-sm font-semibold text-white transition-all"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
            >
              <LogIn size={14} /> Login
            </Link>
          </div>
        </div>
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap');
      `}</style>
    </>
  );
}
