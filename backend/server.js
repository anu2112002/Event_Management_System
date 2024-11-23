const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "event_management",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.use(cors());
app.use(bodyParser.json());

// Endpoint to fetch all events
app.get("/api/events", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint to fetch event details by ID
app.get("/api/events/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM events WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Endpoint to create a new event (Event Organizers)
app.post("/api/events", (req, res) => {
  const { name, description, date, location, price } = req.body;
  const query = "INSERT INTO events (name, description, date, location, price) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [name, description, date, location, price], (err, result) => {
    if (err) throw err;
    res.json({ message: "Event created successfully" });
  });
});

// Endpoint to purchase tickets
app.post("/api/tickets", (req, res) => {
  const { eventId, tickets } = req.body;
  const query = "INSERT INTO tickets (eventId, tickets) VALUES (?, ?)";
  db.query(query, [eventId, tickets], (err, result) => {
    if (err) throw err;
    res.json({ message: "Tickets purchased successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
