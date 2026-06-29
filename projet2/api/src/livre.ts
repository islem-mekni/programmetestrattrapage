import db from "./database";

function ajouterLivre(nom:string,autheur:string,categorie:string,quantite:number){
    const requete=db.prepare("INSERT INTO livre (nom,autheur,categorie,quantite) values (?,?,?,?)");
    const resultat=requete.run(nom,autheur,categorie,quantite);
    return Number(resultat.lastInsertRowid);
} 
function afficherLivres(){
    const requete=db.prepare("SELECT * FROM livre");
    return requete.all();
}

function supprimerLivre(id:number){
    const requete=db.prepare("DELETE FROM livre WHERE id=?");
    const resultat=requete.run(id);
    return resultat.changes;
}
function getLivre(id:number){
    const requete=db.prepare("SELECT * FROM livre WHERE id =?");
    return requete.get(id);
}
function retirerQuantiteLivre(id: number, quantiteARetirer: number) {
  const livre = getLivre(id) as { id: number; nom: string; autheur:string;categorie:string;quantite:number } | undefined;
  
  if (!livre) {
    return null;
  }

  let nouvelleQuantite = livre.quantite - quantiteARetirer;
  if (nouvelleQuantite < 0) {
    nouvelleQuantite = 0;
  }

  const requete = db.prepare("UPDATE livre SET quantite=? where id=?");
  requete.run(nouvelleQuantite, id);

  return nouvelleQuantite;

}
export{ajouterLivre,afficherLivres,getLivre,supprimerLivre,retirerQuantiteLivre};
