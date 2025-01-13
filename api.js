const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
app.use(express.json());

const db = new sqlite3.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
    console.log("Connected to the database.");
  }
);

app.post("/produits", (req, res) => {
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

app.get("/produits", (req, res) => {
  const sql = `SELECT * FROM Produits`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

app.get("/produits/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Produits WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: row });
  });
});

app.put("/produits/:id", (req, res) => {
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

app.delete("/produits/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Produits WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

// CRUD operations for Categories
app.post("/categories", (req, res) => {
  const { nom } = req.body;
  const sql = `INSERT INTO Categories (nom) VALUES (?)`;
  db.run(sql, [nom], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get("/categories", (req, res) => {
  const sql = `SELECT * FROM Categories`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

app.get("/categories/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Categories WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: row });
  });
});

app.put("/categories/:id", (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  const sql = `UPDATE Categories SET nom = ? WHERE id = ?`;
  db.run(sql, [nom, id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

app.delete("/categories/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Categories WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

// CRUD operations for Fournisseurs
app.post("/fournisseurs", (req, res) => {
  const { nom, contact } = req.body;
  const sql = `INSERT INTO Fournisseurs (nom, contact) VALUES (?, ?)`;
  db.run(sql, [nom, contact], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get("/fournisseurs", (req, res) => {
  const sql = `SELECT * FROM Fournisseurs`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

app.get("/fournisseurs/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Fournisseurs WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: row });
  });
});

app.put("/fournisseurs/:id", (req, res) => {
  const { id } = req.params;
  const { nom, contact } = req.body;
  const sql = `UPDATE Fournisseurs SET nom = ?, contact = ? WHERE id = ?`;
  db.run(sql, [nom, contact, id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

app.delete("/fournisseurs/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Fournisseurs WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

// CRUD operations for Clients
app.post("/clients", (req, res) => {
  const { nom, adresse, contact } = req.body;
  const sql = `INSERT INTO Clients (nom, adresse, contact) VALUES (?, ?, ?)`;
  db.run(sql, [nom, adresse, contact], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get("/clients", (req, res) => {
  const sql = `SELECT * FROM Clients`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

app.get("/clients/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Clients WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: row });
  });
});

app.put("/clients/:id", (req, res) => {
  const { id } = req.params;
  const { nom, adresse, contact } = req.body;
  const sql = `UPDATE Clients SET nom = ?, adresse = ?, contact = ? WHERE id = ?`;
  db.run(sql, [nom, adresse, contact, id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

app.delete("/clients/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Clients WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

// CRUD operations for Commandes
app.post("/commandes", (req, res) => {
  const { date_commande, client_id, status } = req.body;
  const sql = `INSERT INTO Commandes (date_commande, client_id, status) VALUES (?, ?, ?)`;
  db.run(sql, [date_commande, client_id, status], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get("/commandes", (req, res) => {
  const sql = `SELECT * FROM Commandes`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

app.get("/commandes/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Commandes WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: row });
  });
});

app.put("/commandes/:id", (req, res) => {
  const { id } = req.params;
  const { date_commande, client_id, status } = req.body;
  const sql = `UPDATE Commandes SET date_commande = ?, client_id = ?, status = ? WHERE id = ?`;
  db.run(sql, [date_commande, client_id, status, id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

app.delete("/commandes/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Commandes WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

// CRUD operations for Lignes_Commandes
app.post("/lignes_commandes", (req, res) => {
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

app.get("/lignes_commandes", (req, res) => {
  const sql = `SELECT * FROM Lignes_Commandes`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

app.get("/lignes_commandes/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Lignes_Commandes WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: row });
  });
});

app.put("/lignes_commandes/:id", (req, res) => {
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

app.delete("/lignes_commandes/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Lignes_Commandes WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

// Listing all clients with their orders
app.get("/clients/:id/commandes", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Commandes WHERE client_id = ?`;
  db.all(sql, [id], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

// Listing all orders with their lines
app.get("/commandes/:id/lignes", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Lignes_Commandes WHERE commande_id = ?`;
  db.all(sql, [id], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ data: rows });
  });
});

module.exports = app;
