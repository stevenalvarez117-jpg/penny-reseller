const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const redis = require('../config/redis');

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const { store, category, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products WHERE active = true';
    const params = [];

    if (store) {
      query += ' AND store = $' + (params.length + 1);
      params.push(store);
    }

    if (category) {
      query += ' AND category = $' + (params.length + 1);
      params.push(category);
    }

    if (minPrice) {
      query += ' AND current_price >= $' + (params.length + 1);
      params.push(minPrice);
    }

    if (maxPrice) {
      query += ' AND current_price <= $' + (params.length + 1);
      params.push(maxPrice);
    }

    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const result = await pool.query(query, params);
    const countResult = await pool.query('SELECT COUNT(*) FROM products WHERE active = true');

    res.json({
      products: result.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      limit
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Try cache first
    const cached = await redis.get(`product:${id}`);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = result.rows[0];

    // Get listings for this product
    const listingsResult = await pool.query(
      'SELECT * FROM listings WHERE product_id = $1 ORDER BY current_price ASC',
      [id]
    );

    product.listings = listingsResult.rows;

    // Cache for 1 hour
    await redis.setEx(`product:${id}`, 3600, JSON.stringify(product));

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
