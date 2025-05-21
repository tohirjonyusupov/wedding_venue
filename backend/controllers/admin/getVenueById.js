const pool = require("../../config/db");

exports.getVenueById = async (req, res) => {
  try {
    const { venue_id } = req.params;

    const venueRes = await pool.query(
      `SELECT v.*, d.name as district_name, i.image_url
       FROM venues v
       LEFT JOIN images i ON v.id = i.venue_id
       LEFT JOIN district d ON v.district_id = d.id
       WHERE v.id = $1`,
      [venue_id]
    );

    if (venueRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Venue topilmadi" });
    }

    const venue = {
      id: venueRes.rows[0].id,
      name: venueRes.rows[0].name,
      address: venueRes.rows[0].address,
      capacity: venueRes.rows[0].capacity,
      district_id: venueRes.rows[0].district_id,
      district_name: venueRes.rows[0].district_name,
      price_seat: venueRes.rows[0].price_seat,
      phone_number: venueRes.rows[0].phone_number,
      status: venueRes.rows[0].status,
      owner_id: venueRes.rows[0].owner_id,
      images: venueRes.rows.map((row) => 'http://localhost:4000/uploads/' + row.image_url).filter(Boolean),
    };

    const bookingsRes = await pool.query(
      `SELECT b.id, b.guest_count, b.reservation_date, v.name, u.firstname 
       FROM bookings b
       INNER JOIN venues v on b.venue_id = v.id
       INNER JOIN users u on b.user_id = u.id
       WHERE b.venue_id = $1`,
      [venue_id]
    );

    return res.status(200).json({
      success: true,
      venue,
      bookings: bookingsRes.rows,
    });

  } catch (err) {
    console.error("Error in getVenueById:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
