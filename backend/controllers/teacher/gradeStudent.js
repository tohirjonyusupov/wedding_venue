const pool = require("../../config/db");

exports.gradeWork = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ error: "Access denied. Only teachers can grade work." });
    }
    const { id } = req.params;
    const { grade } = req.body;

    if (!grade || grade < 0 || grade > 5) {
      return res.status(400).json({ error: "Grade must be between 0 and 5." });
    }

    const workCheck = await pool.query(
      `SELECT sw.*, c.teacher_id 
            FROM studentWork sw 
            JOIN tasks t ON sw.task_id = t.id 
            JOIN courses c ON t.course_id = c.id 
            WHERE sw.id = $1`,
      [id]
    );
    if (workCheck.rows.length === 0) {
      return res.status(404).json({ error: "Student work not found." });
    }

    const teacherId = req.user.id;
    if (workCheck.rows[0].teacher_id !== teacherId) {
      return res
        .status(403)
        .json({ error: "You are not the teacher of this course." });
    }
    const updateQuery = `
         UPDATE studentWork 
            SET grade = $1 
             WHERE id = $2 
              RETURNING *`;
    const updatedWork = await pool.query(updateQuery, [grade, id]);
    res.status(200).json({
      message: "Grade updated successfully",
      studentWork: updatedWork.rows[0],
    });
  } catch (error) {
    console.error("Error grading work:", error);
    res.status(500).json({ error: "Server error while grading work." });
  }
};
exports.updateGrade = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send({ message: 'Tizimga kirish uchun token kerak' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacherId = decoded.id;

    const teacherCheck = await pool.query(
      'SELECT * FROM users WHERE id = $1 AND role = $2',
      [teacherId, 'teacher']
    );

    if (teacherCheck.rows.length === 0) {
      return res.status(403).send({ message: 'Faqat o‘qituvchilar uchun ruxsat berilgan' });
    }

    const { id } = req.params;
    const { grade } = req.body;

    const result = await pool.query(
      'UPDATE submitworks SET grade = $1 WHERE id = $2 RETURNING *',
      [grade, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'Topshirilgan ish topilmadi' });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).send({ message: 'Serverda xatolik yuz berdi.', error: error.message });
  }
};