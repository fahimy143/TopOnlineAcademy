require("dotenv").config();
const db = require("./db");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const app = express(); // <-- define app FIRST
const classRoutes = require("./routes/classes");
const enrollmentRoutes = require("./routes/enrollments");
const packageRoutes = require("./routes/packages");
const libraryRoutes = require("./routes/library");
const eventRoutes = require("./routes/events");
const contactRoutes = require("./routes/contact");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // <-- then use app

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to Top Online Academy Backend!");
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ result: rows[0].result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/api/classes", classRoutes);
app.use("/api/enroll", enrollmentRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contact", contactRoutes);
