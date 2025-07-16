const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all upcoming classes
router.get("/", async (req, res) => {
  try {
    const [classes] = await db.query(
      "SELECT * FROM classes ORDER BY class_date, class_time"
    );
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
});

// POST - Add a new class
router.post("/", async (req, res) => {
  const { title, description, level, teacher, class_date, class_time } =
    req.body;

  try {
    await db.query(
      "INSERT INTO classes (title, description, level, teacher, class_date, class_time) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, level, teacher, class_date, class_time]
    );
    res.json({ message: "Class added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add class" });
  }
});

// PUT - Update a class
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description, level, teacher, class_date, class_time } =
    req.body;

  try {
    await db.query(
      "UPDATE classes SET title = ?, description = ?, level = ?, teacher = ?, class_date = ?, class_time = ? WHERE id = ?",
      [title, description, level, teacher, class_date, class_time, id]
    );
    res.json({ message: "Class updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update class" });
  }
});

// DELETE - Remove a class
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM classes WHERE id = ?", [id]);
    res.json({ message: "Class deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete class" });
  }
});

module.exports = router;
