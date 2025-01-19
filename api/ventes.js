const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/ventes", (req, res) => {
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date) {
      return res
        .status(400)
        .json({ error: "Les dates de début et de fin sont requises." });
    }

    const query = `
      SELECT SUM(lc.quantite * lc.prix_unitaire) AS total_ventes
      FROM Lignes_Commandes lc
      JOIN Commandes c ON lc.commande_id = c.id
      WHERE c.date_commande BETWEEN ? AND ?;
    `;

    db.get(query, [start_date, end_date], (err, row) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ error: "Erreur lors du calcul des ventes." });
      }

      res.json({ total_ventes: row.total_ventes || 0 });
    });
  });

  return router;
};
