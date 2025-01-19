const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { produit_id, fournisseur_id } = req.body;

    const query = `
      INSERT INTO Produits_Fournisseurs (produit_id, fournisseur_id)
      VALUES (?, ?);
    `;

    db.run(query, [produit_id, fournisseur_id], function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ error: "Erreur lors de l'ajout de la relation." });
      }

      res.status(201).json({
        message: "Relation ajoutée avec succès.",
        id: this.lastID,
      });
    });
  });

  router.get("/", (req, res) => {
    const query = `
      SELECT * FROM Produits_Fournisseurs;
    `;

    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des relations." });
      }

      res.json(rows);
    });
  });

  router.get("/produit/:id", (req, res) => {
    const produitId = req.params.id;

    const query = `
      SELECT f.*
      FROM Fournisseurs f
      JOIN Produits_Fournisseurs pf ON f.id = pf.fournisseur_id
      WHERE pf.produit_id = ?;
    `;

    db.all(query, [produitId], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({
          error: "Erreur lors de la récupération des fournisseurs du produit.",
        });
      }

      res.json(rows);
    });
  });

  router.delete("/", (req, res) => {
    const { produit_id, fournisseur_id } = req.body;

    const query = `
      DELETE FROM Produits_Fournisseurs
      WHERE produit_id = ? AND fournisseur_id = ?;
    `;

    db.run(query, [produit_id, fournisseur_id], function (err) {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ error: "Erreur lors de la suppression de la relation." });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Relation non trouvée." });
      }

      res.json({ message: "Relation supprimée avec succès." });
    });
  });

  router.put("/", (req, res) => {
    const { produit_id, ancien_fournisseur_id, nouveau_fournisseur_id } =
      req.body;

    const query = `
      UPDATE Produits_Fournisseurs
      SET fournisseur_id = ?
      WHERE produit_id = ? AND fournisseur_id = ?;
    `;

    db.run(
      query,
      [nouveau_fournisseur_id, produit_id, ancien_fournisseur_id],
      function (err) {
        if (err) {
          console.error(err.message);
          return res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour de la relation." });
        }

        if (this.changes === 0) {
          return res.status(404).json({ error: "Relation non trouvée." });
        }

        res.json({ message: "Relation mise à jour avec succès." });
      }
    );
  });

  return router;
};
