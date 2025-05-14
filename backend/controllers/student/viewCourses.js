const pool = require("../../config/db");
exports.viewCourseStudents = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT 
        c.id AS course_id,
        c.name AS course_name,
        u.id AS student_id,
        u.firstname,
        u.lastname,
        u.username
      FROM courses c
      INNER JOIN enrollment e ON c.id = e.course_id
      INNER JOIN users u ON e.student_id = u.id
      WHERE u.role = 'student' and u.id=$1
      ORDER BY c.id, u.firstname
    `;

    const values = [id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(200).json({ message: "Hech qanday talaba topilmadi", data: [] });
    }

    res.status(200).json({
      message: "Talabalar ro'yxati muvaffaqiyatli olindi",
      data: result.rows,
    });
  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).json({ message: "Talabalarni olishda xatolik yuz berdi" });
  }
};
