const pool = require("../../config/db");

exports.ownerBookings = async (req, res) => {
  try {
    const { owner_id } = req.params;

    const result = await pool.query(
      `SELECT 
          b.id AS booking_id,
          b.guest_count,
          b.reservation_date,
          b.status,
          u.firstname,
          u.lastname,
          u.phone_number,
          v.name AS venue_name
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN venues v ON b.venue_id = v.id
        WHERE v.owner_id = $1
        ORDER BY b.reservation_date DESC`,
      [owner_id]
    );

    res.status(200).json({
      message: "Owner bookings retrieved successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching owner bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
