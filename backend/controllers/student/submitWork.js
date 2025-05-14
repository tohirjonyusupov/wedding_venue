const pool = require("../../config/db");
require("dotenv").config();

const submitWork = async (req, res) => {
  try {
    const { title, grade, taskId, studentId } = req.body;
    const filepath = req.file?.path;

    // Majburiy maydonlar tekshiruvi
    if (!title || !filepath || !taskId || !studentId) {
      return res
        .status(400)
        .json({ message: "Majburiy maydonlar yetishmayapti" });
    }

    // // Raqamlik tekshiruvi
    // const task_id = parseInt(taskId);
    // const student_id = parseInt(studentId);
    // if (isNaN(task_id) || isNaN(student_id)) {
    //   return res
    //     .status(400)
    //     .json({ message: "taskId va studentId raqam bo‘lishi kerak" });
    // }

    // Student mavjudligini tekshir
    const studentCheck = await pool.query(
      `SELECT id FROM users WHERE id = $1 AND role = 'student'`,
      [studentId]
    );
    if (studentCheck.rowCount === 0) {
      return res.status(404).json({ message: "Student topilmadi" });
    }

    // Faqat o‘zi yuklashi uchun (agar login bo‘lgan foydalanuvchi bo‘lsa)
    // if (req.user && req.user.id !== student_id) {
    //   return res
    //     .status(403)
    //     .json({
    //       message: "Ruxsat yo‘q: bu ishni boshqa foydalanuvchi yuklay olmaydi",
    //     });
    // }

    // INSERT qilish
    const result = await pool.query(
      `INSERT INTO studentwork (title, filepath, grade, student_id, task_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, filepath, grade, studentId, taskId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).json({ message: "Server xatosi: " + error.message });
  }
};

module.exports = submitWork;
