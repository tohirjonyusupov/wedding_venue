const pool = require("../../config/db");

const viewStudentsOfCourse = async (req, res) => {
    try {
        const { course_id } = req.params;
        const result = await pool.query(`
            SELECT 
                e.id AS enrollment_id,
                c.id AS course_id,
                c.name AS course_name,
                u.id AS student_id,
                u.firstname,
                u.lastname,
                u.username
            FROM courses c
            INNER JOIN enrollment e ON c.id = e.course_id
            INNER JOIN users u ON e.student_id = u.id
            WHERE c.id = $1 AND u.role = 'student'
            ORDER BY c.id, u.firstname
        `, [course_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Hech qanday talaba topilmadi" });
        }
        res.status(200).json({
            message: "Talabalar ro'yxati muvaffaqiyatli olindi",
            data: result.rows,
        });
    } catch (error) {
        console.error("Xatolik:", error);
        res.status(500).json({ error: "Server xatosi!" });
    }
};

module.exports = viewStudentsOfCourse;