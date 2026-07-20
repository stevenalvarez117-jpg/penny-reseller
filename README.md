# Penny Reseller - Buy Low, Sell High

A full-stack web application that identifies penny items and marked-down clearance products from Walmart, Lowe's, and Home Depot, then automatically lists them for resale on Amazon, eBay, and direct public marketplace.

## Features

### For Resellers
- **Inventory Management**: Track all penny/clearance items
- **Price Optimization**: Automatic pricing based on market demand
- **Multi-Channel Listing**: Post to Amazon, eBay, and our marketplace simultaneously
- **Profit Calculator**: Real-time ROI tracking
- **Deal Alerts**: Notifications when new penny items are found

### For Shoppers
- **Public Marketplace**: Browse deals from all resellers
- **Price Comparison**: See lowest prices across channels
- **Deal Voting**: Help community find best deals
- **Saved Items**: Wishlist functionality

## Tech Stack

### Frontend
- Next.js 14
- React
- Tailwind CSS
- TypeScript

### Backend
- Node.js
- Express.js
- PostgreSQL
- Redis (caching)

### APIs
- Walmart API
- Lowe's API
- Home Depot API
- Amazon Selling Partner API
- eBay API

## Project Structure

```
penny-reseller/
├── frontend/          # Next.js React app
├── backend/           # Express.js API server
├── database/          # PostgreSQL migrations & seeds
└── docs/              # Documentation
```

## Getting Started

See individual README files in `/frontend` and `/backend` directories.

## License

MIT
