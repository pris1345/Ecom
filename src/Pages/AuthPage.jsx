import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Store, ArrowRight } from "lucide-react";

function SocialButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium text-sm"
    >
      {icon}
      {label}
    </button>
  );
}

function InputField({ icon: Icon, type, placeholder, value, onChange, right }) {
  return (
    <div className="relative">
      <Icon
        size={17}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
      />
      {right && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {right}
        </div>
      )}
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const isLogin = mode === "login";
  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire up your backend here later
    alert(`${isLogin ? "Logging in" : "Signing up"} with ${form.email}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-indigo-600 p-3 rounded-2xl mb-3">
              <Store size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {isLogin ? "Sign in to your MyShop account" : "Join MyShop today"}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <SocialButton
              label="Continue with Google"
              onClick={() => alert("Google login — connect Firebase/Auth here")}
              icon={
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.6 20H24v8h11.3C33.6 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.8 39.6 16.4 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.5-4.6 5.9l6.2 5.2C40.7 35.8 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"
                  />
                </svg>
              }
            />
            <SocialButton
              label="Continue with GitHub"
              onClick={() => alert("GitHub login — connect OAuth here")}
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                </svg>
              }
            />
            <SocialButton
              label="Continue with Facebook"
              onClick={() => alert("Facebook login — connect OAuth here")}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
                </svg>
              }
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400 font-medium">
              or {isLogin ? "sign in" : "sign up"} with email
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <InputField
                icon={User}
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={update("name")}
              />
            )}
            <InputField
              icon={Mail}
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={update("email")}
            />
            <InputField
              icon={Lock}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={update("password")}
              right={
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            {isLogin && (
              <div className="text-right -mt-2">
                <button
                  type="button"
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition mt-1"
            >
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Toggle mode */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setMode(isLogin ? "signup" : "login");
                setForm({ name: "", email: "", password: "" });
              }}
              className="ml-1 text-indigo-600 font-medium hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Back to home */}
        <p className="text-center text-sm text-gray-400 mt-6">
          <Link to="/" className="hover:text-indigo-600 transition">
            ← Back to MyShop
          </Link>
        </p>
      </div>
    </main>
  );
}
