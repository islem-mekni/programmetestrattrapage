import Database from "better-sqlite3";
const db=new Database("jeu.db");
db.exec(`CREATE TABLE IF NOT EXISTS jeu(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    nbremax INTEGER NOT NULL,
    disponibilite INTEGER NOT NULL DEFAULT 1) 
`);
db.exec(`CREATE TABLE IF NOT EXISTS emprunt(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    date TEXT NOT NULL,
    id_jeu INTEGER FOREINGN KEY REFERENCES jeu(id)
    )
`);

export default db;
