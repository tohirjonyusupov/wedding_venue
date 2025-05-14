const pool = require("../../config/db");

exports.assignOwner = async (req, res) => {
  try {
    const { venue_id, owner_id } = req.body;


    const venue = await pool.query("SELECT * FROM venues WHERE id = $1", [
      venue_id,
    ]);
    if (venue.rows.length === 0) {
      return res.status(404).json({ message: "To'yxona topilmadi" });
    }

    const owner = await pool.query("SELECT * FROM users WHERE id = $1", [owner_id,]);
    if (owner.rows.length === 0) {
      return res.status(404).json({ message: "To'yxona egasi mavjud emas" });
    }

    const assignOwnerQuery = await pool.query(
      `
      UPDATE venues
      SET owner_id = $1
      WHERE id = $2
    `,
      [owner_id, venue_id]
    );

    return res.status(200).json({ message: "Muaffaqiyatli biriktirildi", data: assignOwnerQuery.rows });
  } catch (error) {
    console.error("Error assigning owner:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
