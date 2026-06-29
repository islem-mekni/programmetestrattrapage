import db from "./database";

function ajouterFavoris(nom:string,url:string){
    const requete=db.prepare("INSERT INTO favoris(nom,url) values nom=?,url=?");
    const resultat=requete.run(nom,url);
    return Number(resultat.lastInsertRowid);
}
function listerFavoris(){
    const requete=db.prepare("SELECT * FROM favoris");
    return requete.all();
}
function supprimerFavoris(id:number){
    const requete=db.prepare("DELETE FROM favoris where id=?");
    return requete.run(id).changes;
}
export{ajouterFavoris,listerFavoris,supprimerFavoris};