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

    const imageUrl = req.file ? req.file.filename : null;

const newVenue = await pool.query(
  "INSERT INTO venues (name, address, capacity, district_id, price_seat, phone_number, status, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
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

if (imageUrl) {
  await pool.query(
    `INSERT INTO images (venue_id, image_url) VALUES ($1, $2)`,
    [newVenue.rows[0].id, imageUrl]
  );
}

    // if (images && Array.isArray(images)) {
    //   for (let imageUrl of images) {
    //     await pool.query(
    //       `INSERT INTO images (venue_id, image_url) VALUES ($1, $2)`,
    //       [newVenue.rows[0].id, imageUrl] 
    //     );
    //   }
    // }

    return res
      .status(201)
      .json({ message: "To'yxona muaffaqiyatli qo'shildi", date: newVenue.rows[0] });
  } catch (error) {
    console.error("Error creating venue:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
