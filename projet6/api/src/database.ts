import Database from "better-sqlite3";
const db= new Database("contacts.db");
db.exec(`CREATE TABLE IF NOT EXISTS contact(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    telephone INTEGER NOT NULL,
    email TEXT UNIQUE NOT NULL)
`);
export default db;