const pool = require("../../config/db");

exports.getVenueById = async (req, res) => {
  try {
    const { venue_id } = req.params;

    // Venue ma'lumotlari
    const venue = await pool.query('SELECT * FROM venues WHERE id = $1', [venue_id]);

    // Shu venue uchun bronlar
    const bookingsRes = await pool.query(`
      SELECT b.id, b.guest_count, b.reservation_date, v.name, u.firstname FROM bookings b
      INNER JOIN venues v on b.venue_id = v.id
      INNER JOIN users u on b.user_id = u.id
      WHERE b.venue_id = $1
    `, [venue_id]);

    res.status(200).json({
      success: true,
      venue: venue.rows[0],
      bookings: bookingsRes.rows,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
