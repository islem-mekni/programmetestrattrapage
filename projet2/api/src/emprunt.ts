import db from "./database";

function enregistrerEmprunt(livreId: number, type: string, quantite: number) {
    const requete = db.prepare(
        "INSERT INTO emprunt (id_livre, type, quantite, date) VALUES (?, ?, ?, ?)"
    );
    requete.run(livreId, type, quantite, new Date().toISOString());
}

function historiqueLivre(livreId: number) {
    const requete = db.prepare("SELECT * FROM emprunt WHERE id_livre = ?");
    return requete.all(livreId);
}

export { enregistrerEmprunt, historiqueLivre };
