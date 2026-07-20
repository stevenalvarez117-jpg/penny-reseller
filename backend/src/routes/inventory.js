const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get reseller inventory
router.get('/:resellerId', async (req, res) => {
  try {
    const { resellerId } = req.params;
    const { status = 'all' } = req.query;

    let query = `
      SELECT i.*, p.name, p.store, p.original_price, p.current_price, p.sku
      FROM inventory i
      JOIN products p ON i.product_id = p.id
      WHERE i.reseller_id = $1
    `;
    const params = [resellerId];

    if (status !== 'all') {
      query += ' AND i.status = $' + (params.length + 1);
      params.push(status);
    }

    query += ' ORDER BY i.created_at DESC';

    const result = await pool.query(query, params);

    res.json({
      inventory: result.rows,
      total: result.rows.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Add item to inventory
router.post('/', async (req, res) => {
  try {
    const { resellerId, productId, quantity, purchasePrice, purchaseDate } = req.body;

    const result = await pool.query(
      `INSERT INTO inventory (reseller_id, product_id, quantity, purchase_price, purchase_date, status, created_at)
       VALUES ($1, $2, $3, $4, $5, 'pending', NOW())
       RETURNING *`,
      [resellerId, productId, quantity, purchasePrice, purchaseDate]
    );

    res.status(201).json({
      message: 'Item added to inventory',
      inventory: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add inventory item' });
  }
});

// Update inventory status
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      'UPDATE inventory SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    res.json({ message: 'Inventory updated', inventory: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update inventory' });
  }
});

module.exports = router;
