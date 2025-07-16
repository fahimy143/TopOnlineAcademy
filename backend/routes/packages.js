const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all packages
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT * FROM packages ORDER BY is_free DESC, price"
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch packages" });
  }
});

module.exports = router;
