import db from "./database";

function listerEmprunt(nom:string){
    const requete=db.prepare("SELECT * FROM emprunt e JOIN jeu j ON j.id=e.id_jeu where j.nom=?");
    return requete.all(nom);
}
function ajouterEmprunt(idJEU:number,nom:string){
    const requete1=db.prepare("INSERT INTO emprunt (id_jeu,nom,date) VAlUES (?,?,?");
    const resultat= requete1.run(idJEU,nom,new Date().toISOString());
    const requete2=db.prepare("UPDATE jeu SET disponibilte=? where id=?");
    requete2.run(0,idJEU);
    return resultat.lastInsertRowid;
}
export{ajouterEmprunt,listerEmprunt};