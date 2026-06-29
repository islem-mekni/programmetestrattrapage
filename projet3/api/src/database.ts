import Database from "better-sqlite3";

const db= new Database("tickets.db");
db.exec(` CREATE TABLE ticket(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    description TEXT NOT NULL,
    statut TEXT NOT NULL,
    id_client INTEGER FOREIGN KEY REFERENCES client(id))
`);
db.exec(`CREATE TABLE client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    email TEXT UNIQUE)
`);
db.exec(`CREATE TABLE technicien (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    specialite TEXT NOT NULL)
`);
db.exec(`CREATE TABLE intervention (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dateIntervention date,
    commentaire TEXT NOT NULL,
    id_technicien INTEGER FOREIGN KEY REFERENCES technicien(id),
    id_ticket INTEGR FOREIGN KEY REFERENCES ticket (id))
`)
export default db;