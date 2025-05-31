const pool = require("../../config/db");

exports.stats = async (_, res) => {
  try {
    const totalVenues = pool.query("SELECT COUNT(*) FROM venues");
    const totalBookings = pool.query("SELECT COUNT(*) FROM bookings");
    const pendingBookings = pool.query("SELECT COUNT(*) FROM bookings WHERE status = 'pending'");
    const completedBookings = pool.query("SELECT COUNT(*) FROM bookings WHERE status = 'completed'");
    const cancelledBookings = pool.query("SELECT COUNT(*) FROM bookings WHERE status = 'cancelled'");

    const results = await Promise.all([
      totalVenues,
      totalBookings,
      pendingBookings,
      completedBookings,
      cancelledBookings,
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalVenues: parseInt(results[0].rows[0].count, 10),
        totalBookings: parseInt(results[1].rows[0].count, 10),
        pendingBookings: parseInt(results[2].rows[0].count, 10),
        completedBookings: parseInt(results[3].rows[0].count, 10),
        cancelledBookings: parseInt(results[4].rows[0].count, 10),
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
