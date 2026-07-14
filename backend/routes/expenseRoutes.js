const express = require("express");
const router = express.Router();
const db = require("../db");


//POST
router.post("/", (req, res) => {
  const { amount, category, date, note } = req.body;

  const sql =
    "INSERT INTO expenses (amount, category, date, note) VALUES (?, ?, ?, ?)";

  db.query(sql, [amount, category, date, note], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({ message: "Expense added successfully" });
  });
});

// GET all expenses
router.get("/", (req, res) => {
  const sql = "SELECT * FROM expenses ORDER BY date DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});

// DELETE expense by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM expenses WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  });
});

module.exports = router;