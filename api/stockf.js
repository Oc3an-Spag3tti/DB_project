const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const seuil = req.query.seuil || 10;

    const query = `
    SELECT id, nom, quantite_stock
    FROM Produits
    WHERE quantite_stock <= ?;
  `;

    db.all(query, [seuil], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({
          error: "Erreur lors de la récupération des stocks faibles.",
        });
      }

      res.json(rows);
    });
  });

  return router;
};
