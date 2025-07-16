const express = require("express");
const router = express.Router();
const db = require("../db");

// POST contact form submission
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    await db.query(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );
    res.json({ message: "Thank you for contacting us!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save contact message" });
  }
});

module.exports = router;
