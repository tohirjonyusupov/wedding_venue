// GET /venues (public route)

const pool = require("../../config/db");

exports.getVenues = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.*, i.image_url, d.name as district_name
      FROM venues v
      LEFT JOIN images i ON v.id = i.venue_id
      INNER JOIN district d ON v.district_id = d.id
      WHERE v.status = 'tasdiqlangan'
    `);

    const allVenues = result.rows.map((venue) => {
      return {
        ...venue,
        image_url: venue.image_url
          ? `${req.protocol}://${req.get('host')}/${venue.image_url.replace(/\\/g, '/')}`
          : null
      };
    });
    
    res.status(200).json({ success: true, data: allVenues });
    allVenues
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
