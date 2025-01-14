const sqlite3 = require("sqlite3").verbose();

function createTables(db) {
  let sql;

  sql = `CREATE TABLE IF NOT EXISTS Categories (
        id TEXT PRIMARY KEY,  
        nom TEXT              
    )`;
  db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS Produits (
        id TEXT PRIMARY KEY,
        nom TEXT,
        description TEXT,
        prix_unitaire TEXT,    
        quantite_stock TEXT,   
        categorie_id TEXT     
    )`;
  db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS Fournisseurs (
        id TEXT PRIMARY KEY,
        nom TEXT,
        contact TEXT
    )`;
  db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS Produits_Fournisseurs (
        produit_id TEXT,
        fournisseur_id TEXT
    )`;
  db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS Clients (
        id TEXT PRIMARY KEY,
        nom TEXT,
        adresse TEXT,
        contact TEXT
    )`;
  db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS Commandes (
        id TEXT PRIMARY KEY,
        date_commande TEXT,    
        client_id TEXT,        
        status TEXT
    )`;
  db.run(sql);

  sql = `CREATE TABLE IF NOT EXISTS Lignes_Commandes (
        id TEXT PRIMARY KEY,
        commande_id TEXT,
        produit_id TEXT,
        quantite TEXT,         
        prix_unitaire TEXT     
    )`;
  db.run(sql);
}

module.exports = createTables;
