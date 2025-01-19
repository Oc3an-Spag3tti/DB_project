const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { nom, contact } = req.body;
    const sql = `INSERT INTO Fournisseurs (nom, contact) VALUES (?, ?)`;
    db.run(sql, [nom, contact], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID });
    });
  });

  router.get("/", (req, res) => {
    const sql = `SELECT * FROM Fournisseurs`;
    db.all(sql, [], (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ data: rows });
    });
  });

  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Fournisseurs WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ data: row });
    });
  });

  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nom, contact } = req.body;
    const sql = `UPDATE Fournisseurs SET nom = ?, contact = ? WHERE id = ?`;
    db.run(sql, [nom, contact, id], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ changes: this.changes });
    });
  });

  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Fournisseurs WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ changes: this.changes });
    });
  });

  return router;
};
