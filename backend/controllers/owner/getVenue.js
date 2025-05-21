const pool = require("../../config/db");

exports.getVenue = async (req, res) => {
  try {
    const { venue_id } = req.params;

    const result = await pool.query(
      `SELECT v.*, d.name AS district_name
       FROM venues v
       JOIN district d ON v.district_id = d.id
       WHERE v.id = $1`,
      [venue_id]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({ message: "To'yxona topilmadi", data: [] }); // ✅ to'g'ri: data arrayini yuboramiz
    }

    const venue = result.rows[0];

    return res.status(200).json({
      message: "Venue retrieved successfully",
      data: venue,
    });
  } catch (error) {
    console.error("Error retrieving venue:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}