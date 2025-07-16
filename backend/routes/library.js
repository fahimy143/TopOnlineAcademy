const express = require("express");
const router = express.Router();
const db = require("../db");

// GET resources with optional filters
router.get("/", async (req, res) => {
  const { level, topic } = req.query;

  let query = "SELECT * FROM library_resources WHERE 1=1";
  let params = [];

  if (level) {
    query += " AND level = ?";
    params.push(level);
  }

  if (topic) {
    query += " AND topic = ?";
    params.push(topic);
  }

  try {
    const [results] = await db.query(query, params);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

module.exports = router;
