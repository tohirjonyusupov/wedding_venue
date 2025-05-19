
const pool = require("../../config/db");

exports.getMyBookings = async (req, res) => {
  try {
    const user_id = req.params.id;

    const result = await pool.query(`
      SELECT DISTINCT ON (b.id) b.id, b.reservation_date, b.status, b.guest_count,
       v.name AS venue_name, v.address, d.name AS district_name, i.image_url, v.capacity, v.price_seat
      FROM bookings b
      JOIN venues v ON b.venue_id = v.id
      JOIN district d ON v.district_id = d.id
      LEFT JOIN images i ON v.id = i.venue_id
      WHERE b.user_id = $1
      ORDER BY b.id, i.id ASC, b.reservation_date DESC;

    `, [user_id]);

    const myBookins = result.rows.map((booking) => {
      return {
        ...booking,
        image_url: booking.image_url
        ? `${req.protocol}://${req.get('host')}/${booking.image_url.replace(/\\/g, '/')}`
        : null, // Provide a default image URL if none exists
      };
    });

    res.status(200).json({ success: true, data: myBookins });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};