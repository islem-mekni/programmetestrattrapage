import db from "./database";

function ajouterProduit(nom:string,quantite:number){
    const requete=db.prepare("INSERT INTO  produit (nom,quantite) values(?,?)");
    const resultat=requete.run(nom,quantite);
    return Number(resultat.lastInsertRowid);
}
function modifierProduit(id:number,nouvellequantite:number){
    const requete=db.prepare("UPDATE produit SET quantite=? where id=?")
    requete.run(nouvellequantite,id );
}

function supprimerProduit(id:number){
    const requete=db.prepare("DELETE FROM  produit where id=?");
    const resultat=requete.run(id);
    return resultat.changes;
}
function listerProduit(){
    const requete=db.prepare("SELECT * FROM produit");
    return requete.all();
}
function getProduit(id:number){
    const requete=db.prepare("SELECT * FROM produit where id =?");
    return requete.get(id);
}
function retirerQuantiteProduit(id: number, quantiteARetirer: number) {
  const produit = getProduit(id) as { id: number; nom: string; quantite: number } | undefined;
  
  if (!produit) {
    return null;
  }

  let nouvelleQuantite = produit.quantite - quantiteARetirer;
  if (nouvelleQuantite < 0) {
    nouvelleQuantite = 0;
  }

  const requete = db.prepare("UPDATE produit SET quantite=? where id=?");
  requete.run(nouvelleQuantite, id);

  return nouvelleQuantite;
}
export { ajouterProduit, modifierProduit, supprimerProduit, listerProduit, getProduit, retirerQuantiteProduit };
