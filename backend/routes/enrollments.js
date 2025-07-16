const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/enroll - enroll a student in a class
router.post("/", async (req, res) => {
  const { class_id, student_name, student_email } = req.body;

  if (!class_id || !student_name || !student_email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await db.query(
      "INSERT INTO class_enrollments (class_id, student_name, student_email) VALUES (?, ?, ?)",
      [class_id, student_name, student_email]
    );
    res.json({ message: "Enrollment successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// GET enrolled classes for a student
router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const [results] = await db.query(
      `SELECT e.id, e.class_id, c.title, c.teacher, c.class_date, c.class_time
       FROM class_enrollments e
       JOIN classes c ON e.class_id = c.id
       WHERE e.student_email = ?`,
      [email]
    );

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load enrollments" });
  }
});

module.exports = router;
