const express = require("express");
const { Pool } = require('pg');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL ma'lumotlar bazasiga ulanish
const pool = new Pool({
    connectionString: process.env.DB_URL, // .env faylidan DB_URL ni o'qiydi
});

// Teacher uchun talabalarni filtrlash endpointi
app.get("/teacher/students", async (req, res) => {
    const { teacherId, sortBy } = req.query; // teacherId va sortBy = 'name' yoki 'grade'

    if (!teacherId) {
        return res.status(400).json({ error: "teacherId is required" });
    }

    try {
        let query = `
            SELECT s.* 
            FROM students s
            INNER JOIN courses c ON s.course_id = c.id
            WHERE c.teacher_id = $1
        `;

        // ustoz tanlagan tartib boyicha oquvchilarni filtrlash
        if (sortBy === "name") {
            query += " ORDER BY s.name ASC"; // Alfavit bo'yicha tartiblash
        } else if (sortBy === "grade") {
            query += " ORDER BY s.grade DESC"; // Baholar bo'yicha tartiblash
        }

        // Ma'lumotlar bazasidan sorovni bajarish
        const result = await pool.query(query, [teacherId]);
        res.status(200).json(result.rows); // Natijalarni JSON formatida qaytarish
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
