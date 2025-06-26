const pool = require("../../config/db");

exports.getAllVenues = async (req, res) => {
  try {
    const { search } = req.query;
    let searchQuery = "";
    let queryParams = [];

    if (search) {
      searchQuery = `WHERE venues.name ILIKE $1`;
      queryParams.push(`%${search}%`);
    }

    const query = `
      SELECT 
        venues.*,
        districts.name AS district_name,
        COALESCE(json_agg(images.image_url) FILTER (WHERE images.image_url IS NOT NULL), '[]') AS images
      FROM venues
      LEFT JOIN images ON venues.id = images.venue_id
      LEFT JOIN districts ON venues.district_id = districts.id
      ${searchQuery}
      GROUP BY venues.id, districts.name
    `;

    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No venues found",
      });
    }

    const venues = result.rows.map((venue) => ({
      ...venue,
      images: venue.images.map((img) =>
        // Convert relative image paths to absolute URLs
        [`https://wedding-venue.onrender.com/uploads/${img}`]
      ),
    }));

    res.status(200).json({
      success: true,
      data: venues,
    });
  } catch (error) {
    console.error("Error in getAllVenues:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
