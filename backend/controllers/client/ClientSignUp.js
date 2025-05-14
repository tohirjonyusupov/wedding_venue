const bcrypt = require("bcrypt");
const pool = require("../../config/db");

exports.clientSignUp = async (req, res) => {
  try {
    const { firstname, lastname, username, password, phone_number } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (client.rows.length > 0) {
      return res.status(400).json({ message: "Ushbu username mavjud" });
    }

    const newClient = await pool.query(
      "INSERT INTO users (firstname, lastname, username, password, role, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [firstname, lastname, username, hashedPassword, "client", phone_number]
    );

    return res.status(201).json({message: "Muvaffaqiyatli yaratildi", date: newClient.rows[0]});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik" });
  }
}