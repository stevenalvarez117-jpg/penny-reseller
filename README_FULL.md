# Penny Reseller Website

A full-stack web application that helps you find penny items and clearance deals from Walmart, Lowe's, and Home Depot, then automatically list them for resale on Amazon, eBay, and a public marketplace.

![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-18%2B-green)

## 🎯 Features

### For Resellers
- ✅ **Inventory Management** - Track all penny/clearance items
- ✅ **Price Optimization** - Automatic pricing based on market demand
- ✅ **Multi-Channel Listing** - Post to Amazon, eBay, and our marketplace
- ✅ **Profit Calculator** - Real-time ROI tracking
- ✅ **Deal Alerts** - Notifications for new penny items

### For Shoppers  
- ✅ **Public Marketplace** - Browse deals from all resellers
- ✅ **Price Comparison** - See lowest prices across channels
- ✅ **Deal Voting** - Help community find best deals
- ✅ **Saved Items** - Wishlist functionality

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Redis** - Caching

### APIs
- Walmart Product API
- Lowe's API
- Home Depot API
- Amazon Selling Partner API
- eBay API

## 📁 Project Structure

```
penny-reseller/
├── frontend/              # Next.js React application
│   ├── src/
│   │   ├── app/          # Pages and layouts
│   │   ├── components/   # Reusable components
│   │   └── store/        # Zustand store
│   └── package.json
├── backend/              # Express.js API server
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── config/       # Database & Redis config
│   │   └── server.js     # Entry point
│   ├── database/         # SQL migrations & schema
│   └── package.json
├── docker-compose.yml    # Docker configuration
├── SETUP.md             # Setup guide
└── README.md            # This file
```

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
docker-compose up
```

Visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Database: PostgreSQL on 5432
- Cache: Redis on 6379

### Manual Setup

See [SETUP.md](./SETUP.md) for detailed instructions.

## 📖 Documentation

- [Backend Setup](./backend/README.md)
- [Frontend Setup](./frontend/README.md)
- [Setup & Deployment Guide](./SETUP.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🔑 Key API Endpoints

### Public
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Protected (Resellers)
- `GET /api/inventory/:resellerId` - Get inventory
- `POST /api/inventory` - Add item to inventory
- `POST /api/listings` - Create listing

## 🗄️ Database

Schema includes:
- Users (reseller/shopper types)
- Products (from stores)
- Inventory (reseller stock)
- Listings (multi-channel)
- Sales (order tracking)
- Price history (analytics)

See `backend/database/schema.sql` for full schema.

## 🔐 Authentication

JWT-based authentication with:
- User registration
- Email/password login
- Role-based access (reseller/shopper)
- Token expiration (7 days)

## 💰 Pricing Model

- **Free** - Browse marketplace, view deals
- **Reseller Pro** - List items, inventory management, analytics
- **Enterprise** - API access, bulk operations, dedicated support

## 🚢 Deployment

Supported platforms:
- **Docker** - For local development
- **Heroku** - Easy deployment
- **AWS** - ECS, App Runner, RDS
- **DigitalOcean** - App Platform
- **Vercel** - Frontend hosting

See [SETUP.md](./SETUP.md#deployment) for detailed instructions.

## 📝 Environment Variables

### Backend
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=penny_reseller
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=5000
```

### Frontend
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🧪 Testing

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

## 🤝 Contributing

Contributions welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md)

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 🎉 Credits

Built with ❤️ for penny item resellers everywhere

## 📞 Support

For support, open an issue on GitHub or contact us at support@pennyreseller.com

---

**Last Updated:** July 2024
