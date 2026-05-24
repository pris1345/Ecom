# 🛍️ MyShop

A modern e-commerce web app built with **React**, **Vite**, and **Tailwind CSS**. Fetches real product data from the [DummyJSON API](https://dummyjson.com), with a full cart system, dark mode, auth page, and product detail views.

---

## Features

- **Cart** — Add, remove, update quantity, free shipping threshold
- **Dark / Light mode** — Toggles via context, persists across pages
- **Product search** — Filter by name or description in real time
- **Category filters** — Filter products by category pill buttons
- **Sorting** — Sort by price (low/high) or top rated
- **Product detail page** — Image gallery, reviews, related products
- **Pagination** — Load More button, shows 12 products at a time
- **Auth page** — Login / Signup with Google, GitHub, Facebook options
- **Responsive** — Mobile menu drawer, works on all screen sizes
- **Fast** — Vite HMR, skeleton loaders, optimised images

---

## Project Structure

```
my-shop/
├── public/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Sticky navbar with mobile menu
│   ├── contexts/
│   │   ├── CartContext.jsx     # Global cart state
│   │   └── ThemeContext.jsx    # Dark / light mode
│   ├── hooks/
│   │   └── useProducts.js      # Fetch + paginate products from API
│   ├── lib/
│   │   └── mockData.js         # Fallback / static data
│   ├── pages/
│   │   ├── HomePage.jsx        # Hero, features, featured products, footer
│   │   ├── ProductsPage.jsx    # Full product grid with filters
│   │   ├── ProductDetailPage.jsx # Single product view + reviews
│   │   ├── CartPage.jsx        # Cart items + order summary
│   │   └── AuthPage.jsx        # Login / signup form
│   ├── App.jsx                 # Routes + context providers
│   ├── main.jsx                # React root
│   └── index.css               # Tailwind directives
├── .gitignore
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/my-shop.git
cd my-shop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> The dev server uses **Hot Module Replacement (HMR)** — just save a file and the browser updates instantly. No restart needed.

---

## Built With

| Tool                                       | Purpose                  |
| ------------------------------------------ | ------------------------ |
| [React 18](https://react.dev)              | UI framework             |
| [Vite](https://vitejs.dev)                 | Build tool + dev server  |
| [Tailwind CSS v3](https://tailwindcss.com) | Utility-first styling    |
| [React Router v6](https://reactrouter.com) | Client-side routing      |
| [Lucide React](https://lucide.dev)         | Icon library             |
| [DummyJSON](https://dummyjson.com)         | Free mock e-commerce API |

---

## API

All product data is fetched from **DummyJSON** — no API key required.

| Endpoint                        | Used For               |
| ------------------------------- | ---------------------- |
| `GET /products?limit=12&skip=0` | Paginated product list |
| `GET /products/:id`             | Single product detail  |
| `GET /products/categories`      | Category list          |
| `GET /products/category/:name`  | Related products       |

To swap in a real backend, update the fetch URLs in:

- `src/hooks/useProducts.js`
- `src/pages/ProductDetailPage.jsx`

---

## Scripts

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Build for production → dist/
npm run preview  # Preview production build locally
```

---

## Deployment

### Deploy to Vercel (recommended)

````bash
npm install -g vercel
vercel

### Manual build

```bash
npm run build
# Upload the dist/ folder to any static host
````

---

## Pages

| Route           | Page              | Description                                  |
| --------------- | ----------------- | -------------------------------------------- |
| `/`             | HomePage          | Hero, features, featured products, footer    |
| `/products`     | ProductsPage      | Full grid, search, filters, sort, pagination |
| `/products/:id` | ProductDetailPage | Images, reviews, related products            |
| `/cart`         | CartPage          | Items, quantities, order summary             |
| `/auth`         | AuthPage          | Login and signup forms                       |

---

## License

## MIT — free to use, modify, and distribute.
