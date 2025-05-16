const pool = require("../../config/db");
exports.getAllDistricts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM district
    `);

    

    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}