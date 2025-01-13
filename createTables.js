const sqlite3 = require("sqlite3").verbose();

function createTables(db) {
  let sql;

  sql = `CREATE TABLE IF NOT EXISTS Categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom VARCHAR(255) NOT NULL
    )`;
  db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS Produits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom VARCHAR(255) NOT NULL,
        description TEXT,
        prix_unitaire DECIMAL(10, 2) NOT NULL,
        quantite_stock INT NOT NULL,
        categorie_id INT,
        FOREIGN KEY (categorie_id) REFERENCES Categories(id)
    )`;
  db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS Fournisseurs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom VARCHAR(255) NOT NULL,
        contact VARCHAR(255)
    )`;
  db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS Produits_Fournisseurs (
        produit_id INT,
        fournisseur_id INT,
        PRIMARY KEY (produit_id, fournisseur_id),
        FOREIGN KEY (produit_id) REFERENCES Produits(id),
        FOREIGN KEY (fournisseur_id) REFERENCES Fournisseurs(id)
    )`;
  db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS Clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom VARCHAR(255) NOT NULL,
        adresse TEXT,
        contact VARCHAR(255)
    )`;
  db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS Commandes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date_commande DATE NOT NULL,
        client_id INT,
        status VARCHAR(50) NOT NULL,
        FOREIGN KEY (client_id) REFERENCES Clients(id)
    )`;
  db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS Lignes_Commandes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        commande_id INT,
        produit_id INT,
        quantite INT NOT NULL,
        prix_unitaire DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (commande_id) REFERENCES Commandes(id),
        FOREIGN KEY (produit_id) REFERENCES Produits(id)
    )`;
  db.run(sql);
}

module.exports = createTables;
