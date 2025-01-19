const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { client_id, produits } = req.body;

    if (!client_id || !Array.isArray(produits) || produits.length === 0) {
      return res
        .status(400)
        .json({ error: "Client ID and products are required." });
    }

    db.serialize(() => {
      const stockCheckQuery = `
        SELECT id, stock
        FROM Produits
        WHERE id IN (${produits.map(() => "?").join(", ")});
      `;

      const productIds = produits.map((p) => p.id);

      db.all(stockCheckQuery, productIds, (err, rows) => {
        if (err) {
          console.error(err.message);
          return res
            .status(500)
            .json({ error: "Error checking product stock." });
        }

        const insufficientStock = produits.filter((p) => {
          const product = rows.find((r) => r.id === p.id);
          return !product || product.stock < p.quantite;
        });

        if (insufficientStock.length > 0) {
          return res.status(400).json({
            error: "Insufficient stock for some products.",
            produits: insufficientStock,
          });
        }

        const insertCommandeQuery = `
          INSERT INTO Commandes (date_commande, client_id, status)
          VALUES (date('now'), ?, 'en cours');
        `;

        db.run(insertCommandeQuery, [client_id], function (err) {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Error creating the order." });
          }

          const commandeId = this.lastID;

          produits.forEach((p) => {
            const insertLigneCommandeQuery = `
              INSERT INTO Lignes_Commandes (commande_id, produit_id, quantite, prix_unitaire)
              VALUES (?, ?, ?, ?);
            `;
            db.run(insertLigneCommandeQuery, [
              commandeId,
              p.id,
              p.quantite,
              p.prix_unitaire,
            ]);

            const updateStockQuery = `
              UPDATE Produits
              SET stock = stock - ?
              WHERE id = ?;
            `;
            db.run(updateStockQuery, [p.quantite, p.id]);
          });

          res.status(201).json({ message: "Order created successfully." });
        });
      });
    });
  });


  router.get("/", (req, res) => {
    const { start, end } = req.query;

    let sql = `SELECT * FROM Commandes`;
    const params = [];

    if (start && end) {
      sql += ` WHERE date_commande BETWEEN ? AND ?`;
      params.push(start, end);
    }

    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Error retrieving orders." });
      }
      res.json({ data: rows });
    });
  });

  // Get a specific order by ID
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Commandes WHERE id = ?`;

    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Error retrieving the order." });
      }
      if (!row) {
        return res.status(404).json({ error: "Order not found." });
      }
      res.json({ data: row });
    });
  });


  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { client_id, produits } = req.body;

    if (!client_id || !Array.isArray(produits) || produits.length === 0) {
      return res
        .status(400)
        .json({ error: "Client ID and products are required." });
    }

    db.serialize(() => {
      const updateOrderQuery = `UPDATE Commandes SET client_id = ? WHERE id = ?`;

      db.run(updateOrderQuery, [client_id, id], function (err) {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: "Error updating the order." });
        }

        const deleteLignesCommandesQuery = `DELETE FROM Lignes_Commandes WHERE commande_id = ?`;
        db.run(deleteLignesCommandesQuery, [id], (err) => {
          if (err) {
            console.error(err.message);
            return res
              .status(500)
              .json({ error: "Error updating order lines." });
          }

          produits.forEach((p) => {
            const insertLigneCommandeQuery = `
              INSERT INTO Lignes_Commandes (commande_id, produit_id, quantite, prix_unitaire)
              VALUES (?, ?, ?, ?);
            `;
            db.run(insertLigneCommandeQuery, [
              id,
              p.id,
              p.quantite,
              p.prix_unitaire,
            ]);
          });

          res.json({ message: "Order updated successfully." });
        });
      });
    });
  });


  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const deleteOrderQuery = `DELETE FROM Commandes WHERE id = ?`;

    db.run(deleteOrderQuery, [id], function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Error deleting the order." });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Order not found." });
      }
      res.json({ message: "Order deleted successfully." });
    });
  });

  return router;
};
