const pool = require("../../config/db");

exports.confirimVenue = async (req, res) => {
  try {
    const { venue_id } = req.params;
    
    const venue = await pool.query("SELECT * FROM venues WHERE id = $1", [
      venue_id,
    ]);
    if (venue.rows.length === 0) {
      return res.status(404).json({ message: "To'yxona topilmadi" });
    }

    const confirmVenueQuery = await pool.query(
      `
      UPDATE venues
      SET status = 'tasdiqlangan'
      WHERE id = $1
    `,
      [venue_id]
    );

    return res.status(200).json({ message: "Muaffaqiyatli tasdiqlandi", data: confirmVenueQuery.rows });
  } catch (error) {
    console.error("Error confirming venue:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}