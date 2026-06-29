import db from "./database";

function enregistrerMouvement(id_produit:number,type:string,quantite:number){
    const requete=db.prepare("INSERT INTO mouvement(id_produit,type,quantite) VALUES(?,?,?)");
    return requete.run(id_produit,type,quantite);
}
function historiqueProduit(id_produit:number){
    const requete=db.prepare("SELECT * FROM mouvement WHERE id=?");
    return requete.all(id_produit);
}

export{enregistrerMouvement,historiqueProduit}
