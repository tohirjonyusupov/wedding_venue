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
      SELECT DISTINCT ON (venues.id)
        venues.*,
        images.image_url,
        district.name as district_name
      FROM venues
      LEFT JOIN images ON venues.id = images.venue_id
      LEFT JOIN district ON venues.district_id = district.id
      ${searchQuery}
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
      image_url: venue.image_url
        ? `${req.protocol}://${req.get("host")}/${venue.image_url.replace(/\\/g, "/")}`
        : null,
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
