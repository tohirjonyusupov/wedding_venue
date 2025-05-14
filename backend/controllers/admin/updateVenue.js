const pool = require("../../config/db");

exports.updateVenue = async (req, res) => {
  try {
    const { venue_id } = req.params;
    const {
      name,
      address,
      capacity,
      district_id,
      price_seat,
      phone_number,
      status,
      owner_id,
      images
    } = req.body;


    // Find the venue by ID
    const venue = await pool.query(
      "SELECT * FROM venues WHERE id = $1",
      [venue_id]
    );
    if (venue.rows.length === 0) {
      return res.status(404).json({ message: "To'yxona topilmadi" });
    }

    const updatedVenue = await pool.query(
      "UPDATE venues SET name = $1, address = $2, capacity = $3, district_id = $4, price_seat = $5, phone_number = $6, status = $7, owner_id = $8 WHERE id = $9",
      [
        name,
        address,
        capacity,
        district_id,
        price_seat,
        phone_number,
        status,
        owner_id,
        venue_id
      ]
    );

    if (images && Array.isArray(images)) {
      for (let imageUrl of images) {
        await pool.query(
          `INSERT INTO images (venue_id, image_url) VALUES ($1, $2)`,
          [updatedVenue.rows[0].id, imageUrl] 
        );
      }
    }

    return res.status(200).json({ message: "To'yxona muaffaqiyatli yangilandi", date: updatedVenue.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}