const pool = require("../../config/db");

exports.deleteVenue = async (req, res) => {
  try {
    const { venue_id } = req.params;

    // Check if the venue exists
    const venue = await pool.query("SELECT * FROM venues WHERE id = $1", [venue_id]);
    if (venue.rows.length === 0) {
      return res.status(404).json({ message: "To'yxona topilmadi" });
    }

    // Delete the venue
    await pool.query("DELETE FROM venues WHERE id = $1", [venue_id]);

    res.status(200).json({ message: "To'yxona muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error("Error deleting venue:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}