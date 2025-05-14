const pool = require("../../config/db");

exports.searchVenue = async (req, res) => {
  try {
    const { search } = req.query;
    const venues = await pool.query('select * from venues where name ilike $1', [`%${search}%`])
    res.status(200).json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
