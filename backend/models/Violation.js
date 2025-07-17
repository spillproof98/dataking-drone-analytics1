const pool = require('../db');

const createViolation = async (violation) => {
  const {
    id, drone_id, type, timestamp, date,
    latitude, longitude, image_url, location
  } = violation;

  await pool.query(`
    INSERT INTO violations (
      id, drone_id, type, timestamp, date,
      latitude, longitude, image_url, location
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    ON CONFLICT (id) DO NOTHING;
  `, [id, drone_id, type, timestamp, date, latitude, longitude, image_url, location]);
};

const getAllViolations = async () => {
  const result = await pool.query(`SELECT * FROM violations ORDER BY date DESC`);
  return result.rows;
};

module.exports = {
  createViolation,
  getAllViolations
};
