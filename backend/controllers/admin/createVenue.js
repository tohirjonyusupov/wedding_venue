const pool = require("../../config/db");

exports.createVenue = async (req, res) => {
  try {
    const {
      name,
      address,
      capacity,
      district_id,
      price_seat,
      phone_number,
      owner_id,
    } = req.body;

    // Multer orqali kelgan fayllar
    const images = req.files; // <-- 'images' array

    // Venue yaratish
    const newVenue = await pool.query(
      `INSERT INTO venues (name, address, capacity, district_id, price_seat, phone_number, status, owner_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        name,
        address,
        parseInt(capacity) || null,
        parseInt(district_id) || null,
        parseFloat(price_seat) || null,
        phone_number,
        "tasdiqlanmagan",
        owner_id || null,
      ]
    );

    const venueId = newVenue.rows[0].id;

    // Rasmlarni saqlash
    console.log(images);
    
    if (images && images.length > 0) {
      for (let image of images) {
        await pool.query(
          `INSERT INTO images (venue_id, image_url) VALUES ($1, $2)`,
          [venueId, image.filename]
        );
      }
    }

    return res.status(201).json({
      success: true,
      message: "To'yxona muaffaqiyatli qo'shildi",
      data: newVenue.rows[0],
    });
  } catch (error) {
    console.error("Error creating venue:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
