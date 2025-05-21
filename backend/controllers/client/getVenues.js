const pool = require("../../config/db");

exports.getVenues = async (req, res) => {
  try {
    const venue_id = req.params.id;

    const buildVenueResponse = (rows) => {
      return rows.map((venue) => {
        return {
          ...venue,
          images: venue.images.map((img) =>
            `http://localhost:4000/uploads/${img}`
          ),
        };
      });
    };

    if (venue_id) {
      const result = await pool.query(`
        SELECT v.*, d.name as district_name, 
               COALESCE(json_agg(i.image_url) FILTER (WHERE i.image_url IS NOT NULL), '[]') AS images
        FROM venues v
        LEFT JOIN images i ON v.id = i.venue_id
        INNER JOIN district d ON v.district_id = d.id
        WHERE v.status = 'tasdiqlangan' AND v.id = $1
        GROUP BY v.id, d.name
      `, [venue_id]);

      if (result.rows.length === 0) {
        return res.status(200).json({
          success: true,
          message: "To'yxona topilmadi",
          data: [],
        });
      }

      const allVenues = buildVenueResponse(result.rows);
      return res.status(200).json({ success: true, data: allVenues });
    }

    // All venues
    const result = await pool.query(`
      SELECT v.*, d.name as district_name, 
             COALESCE(json_agg(i.image_url) FILTER (WHERE i.image_url IS NOT NULL), '[]') AS images
      FROM venues v
      LEFT JOIN images i ON v.id = i.venue_id
      INNER JOIN district d ON v.district_id = d.id
      WHERE v.status = 'tasdiqlangan'
      GROUP BY v.id, d.name
    `);

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "To'yxonalar topilmadi",
        data: [],
      });
    }

    const allVenues = buildVenueResponse(result.rows);
    return res.status(200).json({ success: true, data: allVenues });

  } catch (error) {
    console.error("Error in getVenues:", error);
    res.status(500).json({ message: 'Serverda xatolik', error: error.message });
  }
};
