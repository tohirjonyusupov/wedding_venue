const pool = require('../../config/db');
const jwt = require('jsonwebtoken');

exports.getCourseMaterials = async (req, res) => {
  try {
    // Kurs ID ni URL parametridan olish
    const courseId = parseInt(req.params.courseId);
    console.log('Course ID:', courseId); // Debugging

    // Agar courseId noto'g'ri bo'lsa
    if (isNaN(courseId)) {
      return res.status(400).send({ message: "Invalid course ID" });
    }

    const token = req.headers.authorization?.split(" ")[1];

    // Tokenni tekshirish
    if (!token) {
      return res.status(401).send({ message: "Tizimga kirish uchun token kerak" });
    }

    // Tokenni dekodlash va studentId olish
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const studentId = decodedToken.id;

    if (!studentId) {
      return res.status(401).send({ message: "Talaba ID topilmadi" });
    }

    // Talabaning kursga a'zo ekanligini tekshirish
    const enrollmentCheck = await pool.query(
      'SELECT * FROM enrollment WHERE student_id = $1 AND course_id = $2',
      [studentId, courseId]
    );

    if (enrollmentCheck.rows.length === 0) {
      return res.status(403).send({ message: "Siz bu kursga a'zo emassiz" });
    }

    // Kurs materiallarini olish
    const result = await pool.query('SELECT * FROM materials WHERE course_id = $1', [courseId]);

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "Material topilmadi" });
    }

    // Materiallar ro'yxatini qaytarish
    const courseMaterials = result.rows.map((material) => {
      const fileExtension = material.filepath.includes('.')
        ? material.filepath.split('.').pop()
        : 'unknown';
      return {
        ...material,
        format: fileExtension,
        filepath: `http://localhost:4000/uploads/${material.filepath}`,
      };
    });

    res.status(200).json(courseMaterials);

  } catch (error) {
    console.error("Xatolik:", error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ message: "Token noto'g'ri yoki muddati o‘tgan." });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ message: "Token muddati o‘tgan." });
    }

    res.status(500).send({ 
      message: "Serverda xato yuz berdi. Iltimos, qayta urinib ko'ring.", 
      error: error.message 
    });
  }
};