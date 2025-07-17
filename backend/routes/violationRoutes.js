const express = require('express');
const router = express.Router();
const { getAllViolations } = require('../models/Violation');

router.get('/', async (req, res) => {
  try {
    const violations = await getAllViolations();

    const kpis = [
      { label: 'Total Violations', value: violations.length },
      { label: 'Unique Drones', value: new Set(violations.map(v => v.drone_id)).size },
    ];

    const pieData = violations.reduce((acc, cur) => {
      acc[cur.type] = (acc[cur.type] || 0) + 1;
      return acc;
    }, {});

    const timeData = violations.reduce((acc, cur) => {
      const dateStr = new Date(cur.date).toISOString().split('T')[0];
      acc[dateStr] = (acc[dateStr] || 0) + 1;
      return acc;
    }, {});

    res.json({
      violations,
      kpis,
      pieData,
      timeData
    });
  } catch (err) {
    console.error('❌ Error in /api/violations:', err);
    res.status(500).json({ error: 'Failed to fetch violations', details: err.message });
  }
});

module.exports = router;
