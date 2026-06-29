import Database from "better-sqlite3";
const db=new Database("favoris.db");

db.exec(`CREATE TABLE IF NOT EXISTS favoris(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    url TEXT NOT NULL)
`);
export default db;