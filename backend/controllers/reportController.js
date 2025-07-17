const fs = require('fs');
const path = require('path');
const { createViolation, getAllViolations } = require('../models/Violation');

const uploadJSON = async (req, res) => {
  try {
    let json;

    if (req.file) {
      const filePath = req.file.path;
      const rawData = fs.readFileSync(filePath, 'utf-8');
      console.log("📂 Raw data loaded from file:", filePath);

      try {
        json = JSON.parse(rawData);
      } catch (err) {
        console.error("❌ JSON parsing failed:", err.message);
        return res.status(400).json({ error: "Invalid JSON format" });
      }

      fs.unlinkSync(filePath);
    } else {
      json = req.body;
      console.log("✏️ Received manual JSON:", json);
    }

    const { drone_id, date, location, violations } = json;

    if (!drone_id || !date || !location || !Array.isArray(violations)) {
      console.error("❌ Missing required fields in JSON");
      return res.status(400).json({ error: "Missing required fields in JSON" });
    }

    for (const v of violations) {
      const fullTimestamp = v.timestamp.includes('T') ? v.timestamp : `${date}T${v.timestamp}`;
      await createViolation({
        id: v.id,
        drone_id,
        type: v.type,
        timestamp: fullTimestamp,
        date,
        latitude: v.latitude,
        longitude: v.longitude,
        image_url: v.image_url,
        location,
      });
    }

    const allViolations = await getAllViolations();

    const kpis = [
      { label: 'Total Violations', value: allViolations.length },
      { label: 'Unique Drones', value: new Set(allViolations.map(v => v.drone_id)).size },
      { label: 'Total Locations', value: new Set(allViolations.map(v => v.location)).size },
    ];

    const pieData = allViolations.reduce((acc, cur) => {
      acc[cur.type] = (acc[cur.type] || 0) + 1;
      return acc;
    }, {});

    const timeData = allViolations.reduce((acc, cur) => {
      const day = new Date(cur.timestamp).toISOString().split('T')[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    return res.status(200).json({
      violations: allViolations,
      kpis,
      pieData,
      timeData
    });

  } catch (err) {
    console.error("❌ Server error:", err.message);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
};

module.exports = { uploadJSON };
