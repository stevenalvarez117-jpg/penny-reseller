# Penny Reseller - Setup & Deployment Guide

## Quick Start with Docker

The easiest way to get started is with Docker Compose:

```bash
docker-compose up
```

This will start:
- PostgreSQL database on port 5432
- Redis cache on port 6379
- Backend API on port 5000
- Frontend on port 3000

## Manual Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Redis 6+

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Deployment

### Heroku

```bash
# Create app
heroku create your-penny-reseller

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set DATABASE_URL=postgresql://...

# Deploy
git push heroku main
```

### AWS

1. Create RDS PostgreSQL instance
2. Create ElastiCache Redis cluster
3. Deploy backend to ECS/App Runner
4. Deploy frontend to S3 + CloudFront
5. Set up Route 53 for domain

### DigitalOcean

```bash
# Using App Platform
doctl apps create --spec app.yaml
```

## API Integration

### Store Price Scraping

Implement scrapers for:
- Walmart API
- Lowe's API  
- Home Depot API

### Marketplace Listing

Auto-list to:
- Amazon Selling Partner API
- eBay Trading API
- Shopify (optional)

## Database Schema

See `backend/database/schema.sql` for full schema including:
- Users (with user_type: reseller/shopper)
- Products (from various stores)
- Inventory (reseller stock)
- Listings (multi-channel)
- Sales (order tracking)
- Price history (for analytics)

## Monitoring & Logging

- Backend logs: `pm2 logs`
- Database: pgAdmin on port 5050
- Cache: Redis CLI on port 6379

## Next Steps

1. ✅ Backend API setup
2. ✅ Frontend React app
3. ⏳ Integrate store price APIs
4. ⏳ Implement listing automation
5. ⏳ Add payment processing
6. ⏳ Deploy to production

## Support

For issues or questions, check:
- `/backend/README.md`
- `/frontend/README.md`
- GitHub Issues
