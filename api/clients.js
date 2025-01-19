const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    const { nom, adresse, contact } = req.body;
    const sql = `INSERT INTO Clients (nom, adresse, contact) VALUES (?, ?, ?)`;
    db.run(sql, [nom, adresse, contact], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID });
    });
  });

  router.get("/", (req, res) => {
    const sql = `SELECT * FROM Clients`;
    db.all(sql, [], (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ data: rows });
    });
  });


  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Clients WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) return res.status(400).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Client not found" });
      res.json({ data: row });
    });
  });


  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nom, adresse, contact } = req.body;
    const sql = `UPDATE Clients SET nom = ?, adresse = ?, contact = ? WHERE id = ?`;
    db.run(sql, [nom, adresse, contact, id], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ changes: this.changes });
    });
  });


  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Clients WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ changes: this.changes });
    });
  });

  // Получение всех заказов клиента по ID
  router.get("/:id/commandes", (req, res) => {
    const clientId = req.params.id;

    const query = `
      SELECT * FROM Commandes
      WHERE client_id = ?;
    `;

    db.all(query, [clientId], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({
          error: "Erreur lors de la récupération des commandes du client.",
        });
      }

      res.json(rows);
    });
  });

  return router;
};
