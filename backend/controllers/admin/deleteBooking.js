const pool = require("../../config/db");

exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const deletedBooking = await pool.query(
      'DELETE FROM bookings WHERE id = $1 RETURNING *',
      [bookingId]
    );

    if (deletedBooking.rowCount === 0) {
      return res.status(404).json({ message: 'Buyurtma topilmadi' });
    }

    res.status(200).json({ message: "Buyurtma mufaqqiyatli o'chirildi" });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}