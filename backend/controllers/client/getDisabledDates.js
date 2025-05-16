const pool = require("../../config/db");

exports.getDisabledDates = async (req, res) => {
  try {
    const venue_id = req.params.id;
    if (!venue_id) {
      return res.status(400).json({ success: false, message: 'Venue ID is required' });
    }

    const result = await pool.query(`
      SELECT b.reservation_date
      FROM bookings b
      WHERE b.venue_id = $1
    `, [venue_id]);

    const disabledDates = result.rows.map(row => row.reservation_date);

    res.status(200).json({ success: true, data: disabledDates });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}