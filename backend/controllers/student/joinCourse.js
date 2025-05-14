const pool = require("../../config/db");

exports.joinCourse = async (req, res) => {
    try {
        const { student_id, course_id } = req.body;

        // student_id va course_id mavjudligini tekshirish
        if (!student_id || !course_id) {
            return res.status(400).json({ message: "student_id va course_id bo'lishi kerak" });
        }

        // Talaba allaqachon ushbu kursga yozilganligini tekshirish
        const checkEnrollment = await pool.query(
            'SELECT * FROM enrollment WHERE student_id = $1 AND course_id = $2',
            [student_id, course_id]
        );

        // Agar allaqachon yozilgan bo'lsa
        if (checkEnrollment.rows.length > 0) {
            return res.status(400).json({ message: 'Siz allaqachon bu kursga yozilgansiz.' });
        }

        // Agar allaqachon yozilmagan bo'lsa, yangi yozuvni qo‘shish
        const result = await pool.query(
            'INSERT INTO enrollment (student_id, course_id) VALUES ($1, $2) RETURNING *',
            [student_id, course_id]
        );

        // Muvaffaqiyatli qo‘shilganligini bildirish
        res.status(200).json({ message: 'Kursga muvaffaqiyatli yozildingiz!', data: result.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Kursga yozilmadingiz. Iltimos, xatoni dasturchilarga ayting.',
            error
        });
    }
};
