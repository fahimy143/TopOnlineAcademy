const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all events
router.get("/", async (req, res) => {
  try {
    const [events] = await db.query(
      "SELECT * FROM events ORDER BY event_date DESC"
    );
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// GET event details by id
router.get("/:id", async (req, res) => {
  try {
    const [events] = await db.query("SELECT * FROM events WHERE id = ?", [
      req.params.id,
    ]);
    if (events.length === 0)
      return res.status(404).json({ error: "Event not found" });
    res.json(events[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// POST RSVP (attend event)
router.post("/:id/rsvp", async (req, res) => {
  const eventId = req.params.id;
  const { studentName, studentEmail } = req.body;

  if (!studentName || !studentEmail) {
    return res.status(400).json({ error: "Name and Email are required" });
  }

  try {
    await db.query(
      "INSERT INTO event_attendees (event_id, name, email) VALUES (?, ?, ?)",
      [eventId, studentName, studentEmail]
    );
    res.json({ message: "RSVP successful" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save RSVP" });
  }
});

module.exports = router;
