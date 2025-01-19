const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/top-produits", (req, res) => {
    const query = `
      SELECT p.id, p.nom, SUM(lc.quantite) AS quantite_totale
      FROM Produits p
      JOIN Lignes_Commandes lc ON p.id = lc.produit_id
      GROUP BY p.id
      ORDER BY quantite_totale DESC
      LIMIT 10;
    `;

    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des statistiques." });
      }

      res.json(rows);
    });
  });

  return router;
};
