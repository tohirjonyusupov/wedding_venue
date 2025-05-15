// PATCH /owner/bookings/:id/cancel

exports.cancelBookingByOwner = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;

    // Birinchi: bron sizning joyingiz uchunmi?
    const check = await pool.query(`
      SELECT b.id
      FROM bookings b
      JOIN venues v ON b.venue_id = v.id
      WHERE b.id = $1 AND v.user_id = $2
    `, [bookingId, userId]);

    if (check.rowCount === 0) {
      return res.status(403).json({ message: 'Siz bu bronni bekor qila olmaysiz' });
    }

    const cancel = await pool.query(`
      UPDATE bookings
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *;
    `, [bookingId]);

    res.status(200).json({ success: true, data: cancel.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};
