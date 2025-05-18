
const pool = require("../../config/db");

exports.cancelMyBooking = async (req, res) => {
  try {
    const booking_id = req.params.id;

    // 1. Tekshiramiz — bu booking sizga tegishli bo‘lsin
    const check = await pool.query(`
      SELECT * FROM bookings WHERE id = $1
    `, [booking_id]);

    if (check.rowCount === 0) {
      return res.status(403).json({ message: 'Bron mavjud emas' });
    }

    // 2. Statusni "cancelled" ga o‘zgartirish
    const result = await pool.query(`
      UPDATE bookings
      SET status = 'cancelled'
      WHERE id = $1 RETURNING *;
    `, [booking_id]);

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
