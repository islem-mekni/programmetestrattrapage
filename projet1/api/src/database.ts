import Database from "better-sqlite3";
const db=new Database("stock.db");
db.exec(`
    CREATE TABLE IF NOT EXISTS produit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    quantite INTEGER NOT NULL)
`);
db.exec(`
    CREATE TABLE IF NOT EXISTS MOUVEMENT (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    quantite INTEGR NOT NULL,
    id_produit INTEGER NOT NULL,
    FOREIGN KEY (id_produit)  REFERENCES PRODUIT(id))
`);
export default db;
