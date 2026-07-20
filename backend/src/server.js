require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const redis = require('./config/redis');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const productDetailsRoutes = require('./routes/product-details');
const inventoryRoutes = require('./routes/inventory');
const listingRoutes = require('./routes/listings');
const verifyToken = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date(), redis: 'connected' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/product-details', productDetailsRoutes);
app.use('/api/inventory', verifyToken, inventoryRoutes);
app.use('/api/listings', listingRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
});
