import sqlite3  from "sqlite3";

const db = new sqlite3.Database('./database.ts');

db.serialize( () => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, email TEXT)");
});


export default db;
