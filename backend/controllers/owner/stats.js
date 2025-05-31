const pool = require("../../config/db");

exports.stats = async (req, res) => {
  const { owner_id } = req.params;
  try {
    const totalVenues = pool.query("SELECT COUNT(*) FROM venues WHERE owner_id = $1", [owner_id]);
    const totalBookings = pool.query("SELECT COUNT(*) FROM bookings WHERE venue_id IN (SELECT id FROM venues WHERE owner_id = $1)", [owner_id]);

    const results = await Promise.all([
      totalVenues,
      totalBookings,
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalVenues: parseInt(results[0].rows[0].count, 10),
        totalBookings: parseInt(results[1].rows[0].count, 10),
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};