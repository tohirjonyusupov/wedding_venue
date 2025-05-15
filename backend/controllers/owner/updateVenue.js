// PUT /owner/venues/:id

const pool = require("../../config/db");

exports.updateVenue = async (req, res) => {
  try {
    const venueId = req.params.id;
    const { name, address, capacity, price_seat, phone_number } = req.body;

    const result = await pool.query(`
      UPDATE venues
      SET name = $1, address = $2, capacity = $3, price_seat = $4, phone_number = $5
      WHERE id = $6 AND user_id = $7
      RETURNING *;
    `, [name, address, capacity, price_seat, phone_number, venueId, userId]);

    if (result.rowCount === 0) {
      return res.status(403).json({ message: 'Ruxsat yo‘q yoki to‘yxona topilmadi' });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};
