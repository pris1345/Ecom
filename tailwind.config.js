export default {
  darkMode: 'class',   // ← add this line
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {
     fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
  } },
  plugins: [],
}