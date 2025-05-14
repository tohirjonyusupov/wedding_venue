const bcrypt = require('bcrypt');
const pool = require('../../config/db');

exports.editProfile = async (req, res) => {
  const {user_id} = req.params;
  const { firstname, lastname, username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }
    const user = result.rows[0];
    const newFirstname = firstname;
    const newLastname = lastname;
    const newUsername = username;
    const newPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `UPDATE users 
       SET firstname = $1, lastname = $2, username = $3, password = $4 
       WHERE id = $5`,
      [newFirstname, newLastname, newUsername, newPassword, user_id]
    );

    res.status(200).json({
      message: 'Profil muvaffaqiyatli yangilandi',
      user: {
        id: user_id,
        firstname: newFirstname,
        lastname: newLastname,
        username: newUsername,
        password: newPassword
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server xatosi' });
  }
};
