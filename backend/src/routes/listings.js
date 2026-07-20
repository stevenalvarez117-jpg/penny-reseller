const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all active listings
router.get('/', async (req, res) => {
  try {
    const { channel, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM listings WHERE status = \'active\'';
    const params = [];

    if (channel) {
      query += ' AND channel = $' + (params.length + 1);
      params.push(channel);
    }

    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const result = await pool.query(query, params);

    res.json({
      listings: result.rows,
      page,
      limit
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// Create listing
router.post('/', async (req, res) => {
  try {
    const { inventoryId, channel, currentPrice, quantity } = req.body;

    const result = await pool.query(
      `INSERT INTO listings (inventory_id, channel, current_price, quantity, status, created_at)
       VALUES ($1, $2, $3, $4, 'active', NOW())
       RETURNING *`,
      [inventoryId, channel, currentPrice, quantity]
    );

    res.status(201).json({
      message: 'Listing created successfully',
      listing: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

module.exports = router;
