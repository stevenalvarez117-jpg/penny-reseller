# Backend Setup

## Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Redis 6+

## Installation

```bash
cd backend
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

## Database Setup

```bash
# Create database
psql -U postgres -c "CREATE DATABASE penny_reseller;"

# Run migrations
node scripts/migrate.js
```

## Running Locally

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get product details (public)

### Inventory (Protected)
- `GET /api/inventory/:resellerId` - Get reseller inventory
- `POST /api/inventory` - Add item to inventory
- `PATCH /api/inventory/:id` - Update inventory item

### Listings (Protected)
- `GET /api/listings` - Get active listings
- `POST /api/listings` - Create listing

## Testing

```bash
npm test
```
