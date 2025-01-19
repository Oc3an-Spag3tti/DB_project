const express = require("express");
const router = express.Router();


module.exports = (db) => {
  router.post("/", (req, res) => {
    const { commande_id, produit_id, quantite, prix_unitaire } = req.body;
    const sql = `INSERT INTO Lignes_Commandes (commande_id, produit_id, quantite, prix_unitaire) VALUES (?, ?, ?, ?)`;
    db.run(
      sql,
      [commande_id, produit_id, quantite, prix_unitaire],
      function (err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID });
      }
    );
  });

  router.get("/", (req, res) => {
    const sql = `SELECT * FROM Lignes_Commandes`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ data: rows });
    });
  });


  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Lignes_Commandes WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ data: row });
    });
  });


  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { commande_id, produit_id, quantite, prix_unitaire } = req.body;
    const sql = `UPDATE Lignes_Commandes SET commande_id = ?, produit_id = ?, quantite = ?, prix_unitaire = ? WHERE id = ?`;
    db.run(
      sql,
      [commande_id, produit_id, quantite, prix_unitaire, id],
      function (err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.json({ changes: this.changes });
      }
    );
  });


  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Lignes_Commandes WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ changes: this.changes });
    });
  });
  return router;
};
