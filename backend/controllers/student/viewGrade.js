const pool = require('../../config/db');

// Student ID bo'yicha ma'lumotlarni olish
exports.getStudenttask = async (req, res) => {
    const { student_id } = req.params;

    try {
        const query = `
      SELECT filepath, title, grade, student_id, task_id
      FROM studentwork
      WHERE student_id = $1
    `;
        const result = await pool.query(query, [student_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Ma\'lumot topilmadi' });
        }

        res.json(result.rows);
    } catch (error) {
        console.error('Xato:', error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};