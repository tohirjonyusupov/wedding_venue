// POST /bookings

const pool = require("../../config/db");

exports.createBooking = async (req, res) => {
  try {
    const { venue_id, reservation_date, guest_count, user_id } = req.body;

    // 1. Foydalanuvchini yoki token orqali olasiz
    // const userId = req.user.id;

    // 2. Sana band emasligini tekshirish
    const existing = await pool.query(`
      SELECT * FROM bookings 
      WHERE venue_id = $1 AND reservation_date = $2 AND status != 'cancelled'
    `, [venue_id, reservation_date]);

    if (existing.rowCount > 0) {
      return res.status(400).json({ message: "Bu sana allaqachon bron qilingan." });
    }

    // 3. Booking yozish
    const result = await pool.query(`
      INSERT INTO bookings (venue_id, user_id, reservation_date, guest_count, status)
      VALUES ($1, $2, $3, $4, 'pending') RETURNING *;
    `, [venue_id, user_id, reservation_date, guest_count]);


    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
