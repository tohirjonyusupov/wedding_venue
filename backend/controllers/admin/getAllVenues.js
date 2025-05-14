const pool = require("../../config/db");

exports.getAllVenues = async (req, res) => {
  try {
    const {
      price = 'asc',
      capacity = 'asc',
      district,
      status
    } = req.query;

    const values = [];
    const whereClauses = [];

    if (district) {
      values.push(district);
      whereClauses.push(`district_id = $${values.length}`);
    }

    if (status) {
      values.push(status);
      whereClauses.push(`status = $${values.length}`);
    }

    const whereQuery = whereClauses.length > 0
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    const allowedSorts = ['asc', 'desc'];
    const safeCapacity = allowedSorts.includes(capacity.toLowerCase()) ? capacity : 'asc';
    const safePrice = allowedSorts.includes(price.toLowerCase()) ? price : 'asc';

    const query = `
      SELECT * FROM venues
      ${whereQuery}
      ORDER BY capacity ${safeCapacity}, price_seat ${safePrice}
    `;

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      data: result.rows,
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
