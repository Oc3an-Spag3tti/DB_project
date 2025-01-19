const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { nom, description, prix_unitaire, quantite_stock, categorie_id } =
      req.body;
    const sql = `INSERT INTO Produits (nom, description, prix_unitaire, quantite_stock, categorie_id) VALUES (?, ?, ?, ?, ?)`;
    db.run(
      sql,
      [nom, description, prix_unitaire, quantite_stock, categorie_id],
      function (err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID });
      }
    );
  });

  router.get("/", (req, res) => {
    const sql = `SELECT * FROM Produits`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ data: rows });
    });
  });

  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Produits WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ data: row });
    });
  });

  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nom, description, prix_unitaire, quantite_stock, categorie_id } =
      req.body;
    const sql = `UPDATE Produits SET nom = ?, description = ?, prix_unitaire = ?, quantite_stock = ?, categorie_id = ? WHERE id = ?`;
    db.run(
      sql,
      [nom, description, prix_unitaire, quantite_stock, categorie_id, id],
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
    const sql = `DELETE FROM Produits WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ changes: this.changes });
    });
  });

  router.get("/:id/commandes", (req, res) => {
    const produitId = req.params.id;

    const query = `
    SELECT c.*
    FROM Commandes c
    JOIN Lignes_Commandes lc ON c.id = lc.commande_id
    WHERE lc.produit_id = ?;
  `;

    db.all(query, [produitId], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({
          error:
            "Erreur lors de la récupération des commandes contenant le produit.",
        });
      }

      res.json(rows);
    });
  });

  return router;
};
