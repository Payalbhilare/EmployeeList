import express from "express";
import sqlite3 from "sqlite3";

import cors from "cors";

const app = express();
const PORT = 3001;

// Path to the SQLite database file
const DB_FILE = "employees.db";

// Initialize SQLite database
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log(`Connected to SQLite database at ${DB_FILE}`);
  }
});

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Routes
app.get("/hello", (req, res) => {
  console.log("GET /hello endpoint hit");
  res.json({ message: "Hello from the server!" });
});

app.get("/employees", (req, res) => {
  console.log("GET /employees endpoint hit");
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) {
      console.error("Error fetching employees:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post("/employees", (req, res) => {
  console.log("POST /employees endpoint hit with data:", req.body);
  const { name, role, department, contact, info, bio } = req.body;
  db.run(
    "INSERT INTO employees (name, role, department, contact, info, bio) VALUES (?, ?, ?, ?, ?, ?)",
    [name, role, department, contact, info, bio],
    function (err) {
      if (err) {
        console.error("Error inserting employee:", err.message);
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          id: this.lastID,
          name,
          role,
          department,
          contact,
          info,
          bio,
        });
      }
    }
  );
});

// Start server
export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

// Call startServer to ensure the server starts
startServer();
