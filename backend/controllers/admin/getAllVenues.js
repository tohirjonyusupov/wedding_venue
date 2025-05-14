const pool = require("../../config/db");

exports.getAllVenues = async (req, res) => {
  try {
    const { price = 'asc', capacity = 'asc', district, status = 'all' } = req.query;

    const venues = await pool.query('select * from venues order by price $1', [price]);

    res.status(200).json({
      success: true,
      data: venues.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
