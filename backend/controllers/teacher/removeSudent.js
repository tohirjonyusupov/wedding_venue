const pool = require("../../config/db");

// Student o'chirish
exports.removeStudent = async (req, res) => {
  const { enrollment_id } = req.params;
  try {
    const result = await pool.query("DELETE FROM enrollment WHERE id = $1", [enrollment_id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};