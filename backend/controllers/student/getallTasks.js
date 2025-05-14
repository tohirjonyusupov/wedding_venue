const pool = require('../../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getAllTasks = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    console.log('Course ID:', courseId);

    // courseId raqam ekanligini tekshirish
    if (isNaN(courseId)) {
      return res.status(400).send({ message: "Course ID noto‘g‘ri formatda" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    console.log('Token:', token); // Tokenni konsolga chiqarish

    if (!token) {
      return res.status(401).send({ message: "Tizimga kirish uchun token kerak" });
    }

    // Tokenni tekshirish
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log('Decoded token:', decoded); // Dekodlangan tokenni konsolga chiqarish
    } catch (jwtError) {
      console.error('JWT Error:', jwtError);
      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).send({ message: "Token noto‘g‘ri yoki muddati o‘tgan." });
      }
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).send({ message: "Token muddati o‘tgan." });
      }
      throw jwtError; // Boshqa JWT xatolarini tashlash
    }

    const studentId = decoded.id;
    console.log('Student ID:', studentId);

    // Kursga a'zolikni tekshirish
    const enrollmentCheck = await pool.query(
      'SELECT * FROM enrollment WHERE student_id = $1 AND course_id = $2',
      [studentId, courseId]
    );
    console.log('Enrollment check result:', enrollmentCheck.rows);

    if (enrollmentCheck.rows.length === 0) {
      return res.status(403).send({ message: "Siz bu kursga a'zo emassiz" });
    }

    // Kurs topshiriqlarini olish
    const result = await pool.query('SELECT * FROM tasks WHERE course_id = $1', [courseId]);
    console.log('Tasks result:', result.rows);

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "Topshiriqlar topilmadi" });
    }

    res.status(200).send(result.rows);

  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).send({
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
      stack: error.stack // Xato stackini qo‘shish
    });
  }
};