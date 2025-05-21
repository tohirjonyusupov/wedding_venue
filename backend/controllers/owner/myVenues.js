const pool = require("../../config/db");

exports.myVenues = async (req, res) => {
  try {
    const { owner_id } = req.params;

    const result = await pool.query(
      `SELECT v.*, d.name AS district_name, COALESCE(json_agg(i.image_url) FILTER (WHERE i.image_url IS NOT NULL), '[]') AS images
       FROM venues v
       JOIN district d ON v.district_id = d.id
       JOIN users u ON v.owner_id = u.id
       LEFT JOIN images i ON v.id = i.venue_id
       WHERE v.owner_id = $1
       GROUP BY v.id, d.name`,
      [owner_id]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({ message: "To'yxona topilmadi", data: [] });
    }

    const venues = result.rows.map((venue) => {
      return {
        ...venue,
        images: venue.images.map((img) =>
          `http://localhost:4000/uploads/${img}`
        ),
      };
    });

    return res.status(200).json({
      message: "Venues retrieved successfully",
      data: venues, // ✅ to'g'ri: venues arrayini yuboramiz
    });
  } catch (error) {
    console.error("Error retrieving venues:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
