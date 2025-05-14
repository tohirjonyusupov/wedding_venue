const pool = require("../../config/db");
require("dotenv").config();

exports.getAllSubmitWorks = async (req, res) => {
  try {
    const {teacherId} = req.params
    console.log(teacherId);

    // Topshirilgan ishlarni olish
    const result = await pool.query(`
      SELECT sw.id, sw.title, sw.filepath, sw.grade, sw.student_id, sw.task_id, 
             u.firstname AS student_name, t.title AS task_title, c.name AS course_title
      FROM studentwork sw
      JOIN tasks t ON sw.task_id = t.id
      JOIN courses c ON t.course_id = c.id
      JOIN users u ON sw.student_id = u.id
      WHERE c.teacher_id = $1
    `, [teacherId]);

    if (result.rows.length === 0) {
      return res.status(200).send({ message: "Topshirilgan ismlar topilmadi", data: [] });
    }

    res.status(200).send(result.rows);
  } catch (error) {
    console.error("Xatolik:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).send({ message: "Token noto‘g‘ri yoki muddati o‘tgan." });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Token muddati o‘tgan." });
    }
    res.status(500).send({
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};