const pool = require("../../config/db");

exports.addMaterials = async (req, res) => {
  try {
    const { title, course_id } = req.body;
    const file = req.file ? req.file.filename : null;
    
    if (!file) {
      return res.status(400).send({ message: "Fayl yuklanmadi" });
    }
    
    const course = await pool.query("SELECT * FROM courses WHERE id = $1", [
      course_id,
    ]);

    if (course.rows.length === 0) {
      return res.status(404).send({ message: "Bunday kurs topilmadi" });
    }

    await pool.query(
      "INSERT INTO materials(title, filepath, course_id) VALUES($1, $2, $3)",
      [title, file, course_id]
    );

    res.status(201).send({ message: "Material muaffaqiyatli qo'shildi" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Material qo'shishda xatolik yuz berdi" });
  }
};


exports.getAllMaterials = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM materials`);
    
    if (result.rows.length === 0) {
      return res.status(404).send({ message: "Material topilmadi" });
    }

    const allMaterials = result.rows.map((material) => {
      return {
        ...material,
        format: material.filepath.split(".").pop(),
        filepath: `http://localhost:4000/uploads/${material.filepath}`
      };
    });
    
    

    res.status(200).json({
      message: "Materiallar muvaffaqiyatli olindi",
      data: allMaterials,
    });
  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).send({ message: "Materiallarni olishda xatolik yuz berdi" });
  }
};


exports.getMaterialById = async (req, res) => {
  try {
    const { course_id } = req.params;

    const result = await pool.query(
      `SELECT materials.id, materials.title, materials.filepath 
       FROM materials 
       INNER JOIN courses ON courses.id = materials.course_id 
       WHERE materials.course_id = $1`,
      [course_id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .send({ message: "Bu kurs uchun material topilmadi" });
    }

    res.status(200).json({
      message: "Materiallar muvaffaqiyatli olindi",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Material olishda xatolik yuz berdi" });
  }
};
