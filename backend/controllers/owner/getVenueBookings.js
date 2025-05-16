const pool = require("../../config/db");

exports.getVenueBookings = async (req, res) => {
  try {
    const venue_id = req.params.id;

    const result = await pool.query(`
      SELECT b.id, b.reservation_date, b.guest_count, b.status,
             u.firstname, u.lastname, u.phone_number, v.name as venue_name
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN venues v ON b.venue_id = v.id
      WHERE b.venue_id = $1
      ORDER BY b.reservation_date ASC;
    `, [venue_id]);

    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};
