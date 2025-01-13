const sqlite3 = require("sqlite3").verbose();
const createTables = require("./createTables");
const insertTestData = require("./insertion");
const api = require("./api");

const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("Connected to the database.");

    createTables(db);


    insertTestData(db);

    db.close((err) => {
        if (err) return console.error(err.message);
        console.log("Closed the database connection.");
    });
});

const port = 3000;
api.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
