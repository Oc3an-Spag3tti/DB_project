const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs"); // For checking if the database file exists
const createTables = require("./createTables");
const insertTestData = require("./insertion");

const categoriesRoutes = require("./api/categories");
const clientsRoutes = require("./api/clients");
const CommandesRoutes = require("./api/commandes");
const ProduitsRoutes = require("./api/produits");
const FournisseursRoutes = require("./api/fournisseurs");
const LignesCommandesRoutes = require("./api/lignesCommandes");
//const ProduitsFournisseursRoutes = require("./api/produitsFournisseurs");
const TopProduitsRoutes = require("./api/topproduits");
const VentesRoutes = require("./api/ventes");
const StockFaibleRoutes = require("./api/stockf");

const app = express();
app.use(express.json());

const db = new sqlite3.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }

    console.log("Connected to the database.");

    // Check if database is empty (no tables)
    db.get(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' LIMIT 1;`,
      (err, row) => {
        if (err) {
          console.error("Error checking database tables:", err);
          return;
        }

        if (!row) {
          console.log(
            "Database is empty. Creating tables and inserting test data..."
          );
          createTables(db); // Create tables
          insertTestData(db); // Insert data into newly created tables
        } else {
          console.log(
            "Database already initialized. Checking individual tables for data..."
          );
          // Check if individual tables are empty and insert data if needed
          checkAndInsertData("Categories");
          checkAndInsertData("Clients");
          checkAndInsertData("Commandes");
          checkAndInsertData("Produits");
          checkAndInsertData("Fournisseurs");
          checkAndInsertData("Lignes_Commandes");
        }
      }
    );
  }
);

const checkAndInsertData = (tableName) => {
  db.get(`SELECT COUNT(*) AS count FROM ${tableName}`, (err, row) => {
    if (err) {
      console.error(`Error checking ${tableName}:`, err);
      return;
    }

    if (row.count === 0) {
      console.log(`${tableName} is empty, inserting test data...`);
      insertTestDataForTable(tableName);
    } else {
      console.log(`${tableName} already has data.`);
    }
  });
};

// Function to insert test data for a specific table
const insertTestDataForTable = (tableName) => {
  switch (tableName) {
    case "Categories":
      insertTestData(db, "Categories");
      break;
    case "Clients":
      insertTestData(db, "Clients");
      break;
    case "Commandes":
      insertTestData(db, "Commandes");
      break;
    case "Produits":
      insertTestData(db, "Produits");
      break;
    case "Fournisseurs":
      insertTestData(db, "Fournisseurs");
      break;
    case "Lignes_Commandes":
      insertTestData(db, "Lignes_Commandes");
      break;
    default:
      console.log(`No test data function defined for ${tableName}`);
  }
};

app.use("/categories", categoriesRoutes(db));
app.use("/produits", ProduitsRoutes(db));
app.use("/commandes", CommandesRoutes(db));
app.use("/fournisseurs", FournisseursRoutes(db));
app.use("/lignes_commandes", LignesCommandesRoutes(db));
app.use("/clients", clientsRoutes(db));
//app.use("/produits_fournisseurs", ProduitsFournisseursRoutes(db));
app.use("/statistiques", TopProduitsRoutes(db));
app.use("/statistiques", VentesRoutes(db));
app.use("/stock-faible", StockFaibleRoutes(db));

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
