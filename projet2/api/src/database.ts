import Database from "better-sqlite3";
const db=new Database("bibliotheque.db");
db.exec(`CREATE TABLE IF NOT EXISTS livre(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    autheur TEXT NOT NULL,
    categorie TEXT NOT NULL)
`);
db.exec(` CREATE TABLE IF NOT EXISTS emprunt(
    id PRIMARY KEY INTEGER NOT NULL,
    id_livre INTEGER NOT NULL,
    quantite INTEGER NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY (id_livre) REFERENCES livre(id)
)
`);

export default db;