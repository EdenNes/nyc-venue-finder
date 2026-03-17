const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/venues — return all venues
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM venues ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('[venues] Error fetching venues:', err.message);
    res.status(500).json({ error: 'Failed to fetch venues' });
  }
});

module.exports = router;
