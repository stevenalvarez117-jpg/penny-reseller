# Frontend Setup

## Prerequisites
- Node.js 18+
- npm or yarn

## Installation

```bash
cd frontend
npm install
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

## Running Locally

```bash
npm run dev
```

Application will run on `http://localhost:3000`

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── page.jsx      # Home page
│   ├── layout.jsx    # Root layout
│   ├── marketplace/  # Marketplace pages
│   ├── dashboard/    # User dashboard
│   ├── auth/         # Auth pages (login/register)
│   └── globals.css   # Global styles
├── components/       # Reusable components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── Filters.jsx
│   ├── ResellDashboard.jsx
│   ├── ShopperDashboard.jsx
│   └── ...
└── store/            # Zustand store
    └── index.js
```

## Key Features

- User authentication (Reseller/Shopper)
- Product marketplace with filtering
- Inventory management (for resellers)
- Responsive design with Tailwind CSS
- Real-time notifications with React Hot Toast
- State management with Zustand

## Available Pages

- `/` - Home page
- `/marketplace` - Product marketplace
- `/dashboard` - User dashboard (login required)
- `/auth/login` - Login page
- `/auth/register` - Registration page
