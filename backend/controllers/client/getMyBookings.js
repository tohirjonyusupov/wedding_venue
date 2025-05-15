
const pool = require("../../config/db");

exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(`
      SELECT b.id, b.reservation_date, b.status, b.guest_count,
             v.name AS venue_name, v.address
      FROM bookings b
      JOIN venues v ON b.venue_id = v.id
      WHERE b.user_id = $1
      ORDER BY b.reservation_date DESC
    `, [userId]);

    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
