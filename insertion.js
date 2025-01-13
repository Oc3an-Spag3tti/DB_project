const sqlite3 = require("sqlite3").verbose();
function insertTestData(db) {
  db.serialize(() => {
    const categories = [
      { nom: "Category 1" },
      { nom: "Category 2" },
      { nom: "Category 3" },
      { nom: "Category 4" },
      { nom: "Category 5" },
    ];
    const categoryStmt = db.prepare("INSERT INTO Categories (nom) VALUES (?)");
    categories.forEach((category) => categoryStmt.run(category.nom));
    categoryStmt.finalize();

    const products = [
      {
        nom: "Paper Airplane Model 1",
        description: "Model 1 Description",
        prix_unitaire: 10.0,
        quantite_stock: 100,
        categorie_id: 1,
      },
      {
        nom: "Paper Airplane Model 2",
        description: "Model 2 Description",
        prix_unitaire: 20.0,
        quantite_stock: 200,
        categorie_id: 1,
      },
      {
        nom: "Paper Airplane Model 3",
        description: "Model 3 Description",
        prix_unitaire: 30.0,
        quantite_stock: 300,
        categorie_id: 2,
      },
      {
        nom: "Paper Airplane Model 4",
        description: "Model 4 Description",
        prix_unitaire: 40.0,
        quantite_stock: 400,
        categorie_id: 2,
      },
      {
        nom: "Paper Airplane Model 5",
        description: "Model 5 Description",
        prix_unitaire: 50.0,
        quantite_stock: 500,
        categorie_id: 3,
      },
      {
        nom: "Paper Airplane Model 6",
        description: "Model 6 Description",
        prix_unitaire: 60.0,
        quantite_stock: 600,
        categorie_id: 3,
      },
      {
        nom: "Paper Airplane Model 7",
        description: "Model 7 Description",
        prix_unitaire: 70.0,
        quantite_stock: 700,
        categorie_id: 4,
      },
      {
        nom: "Paper Airplane Model 8",
        description: "Model 8 Description",
        prix_unitaire: 80.0,
        quantite_stock: 800,
        categorie_id: 4,
      },
      {
        nom: "Paper Airplane Model 9",
        description: "Model 9 Description",
        prix_unitaire: 90.0,
        quantite_stock: 900,
        categorie_id: 5,
      },
      {
        nom: "Paper Airplane Model 10",
        description: "Model 10 Description",
        prix_unitaire: 100.0,
        quantite_stock: 1000,
        categorie_id: 5,
      },
    ];
    const productStmt = db.prepare(
      "INSERT INTO Produits (nom, description, prix_unitaire, quantite_stock, categorie_id) VALUES (?, ?, ?, ?, ?)"
    );
    products.forEach((product) =>
      productStmt.run(
        product.nom,
        product.description,
        product.prix_unitaire,
        product.quantite_stock,
        product.categorie_id
      )
    );
    productStmt.finalize();

    const suppliers = [
      { nom: "Supplier 1", contact: "Contact 1" },
      { nom: "Supplier 2", contact: "Contact 2" },
      { nom: "Supplier 3", contact: "Contact 3" },
    ];
    const supplierStmt = db.prepare(
      "INSERT INTO Fournisseurs (nom, contact) VALUES (?, ?)"
    );
    suppliers.forEach((supplier) =>
      supplierStmt.run(supplier.nom, supplier.contact)
    );
    supplierStmt.finalize();

    const clients = [
      { nom: "Client 1", adresse: "Address 1", contact: "Contact 1" },
      { nom: "Client 2", adresse: "Address 2", contact: "Contact 2" },
      { nom: "Client 3", adresse: "Address 3", contact: "Contact 3" },
      { nom: "Client 4", adresse: "Address 4", contact: "Contact 4" },
      { nom: "Client 5", adresse: "Address 5", contact: "Contact 5" },
    ];
    const clientStmt = db.prepare(
      "INSERT INTO Clients (nom, adresse, contact) VALUES (?, ?, ?)"
    );
    clients.forEach((client) =>
      clientStmt.run(client.nom, client.adresse, client.contact)
    );
    clientStmt.finalize();

    const orders = [
      { date_commande: "2023-01-01", client_id: 1, status: "Pending" },
      { date_commande: "2023-01-02", client_id: 2, status: "Pending" },
      { date_commande: "2023-01-03", client_id: 3, status: "Pending" },
      { date_commande: "2023-01-04", client_id: 4, status: "Pending" },
      { date_commande: "2023-01-05", client_id: 5, status: "Pending" },
    ];
    const orderStmt = db.prepare(
      "INSERT INTO Commandes (date_commande, client_id, status) VALUES (?, ?, ?)"
    );
    orders.forEach((order) =>
      orderStmt.run(order.date_commande, order.client_id, order.status)
    );
    orderStmt.finalize();

    const orderLines = [
      { commande_id: 1, produit_id: 1, quantite: 10, prix_unitaire: 10.0 },
      { commande_id: 1, produit_id: 2, quantite: 20, prix_unitaire: 20.0 },
      { commande_id: 2, produit_id: 3, quantite: 30, prix_unitaire: 30.0 },
      { commande_id: 2, produit_id: 4, quantite: 40, prix_unitaire: 40.0 },
      { commande_id: 3, produit_id: 5, quantite: 50, prix_unitaire: 50.0 },
      { commande_id: 3, produit_id: 6, quantite: 60, prix_unitaire: 60.0 },
      { commande_id: 4, produit_id: 7, quantite: 70, prix_unitaire: 70.0 },
      { commande_id: 4, produit_id: 8, quantite: 80, prix_unitaire: 80.0 },
      { commande_id: 5, produit_id: 9, quantite: 90, prix_unitaire: 90.0 },
      { commande_id: 5, produit_id: 10, quantite: 100, prix_unitaire: 100.0 },
    ];
    const orderLineStmt = db.prepare(
      "INSERT INTO Lignes_Commandes (commande_id, produit_id, quantite, prix_unitaire) VALUES (?, ?, ?, ?)"
    );
    orderLines.forEach((line) =>
      orderLineStmt.run(
        line.commande_id,
        line.produit_id,
        line.quantite,
        line.prix_unitaire
      )
    );
    orderLineStmt.finalize();
  });
}

module.exports = insertTestData;
