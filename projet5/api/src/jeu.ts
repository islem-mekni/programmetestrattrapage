import db from "./database";

function listerJeux(){
    const requete=db.prepare("Select * FROM jeu");
    return requete.all();
}
function ajouterJeu(nom:string,nbremax:number){
    const requete=db.prepare("INSERT INTO jeu(nom,nbremax) VALUES (?,?)");
    const resulat=requete.run(nom,nbremax);
    return resulat.lastInsertRowid;
}
function getJeu(id:number){
    const requete=db.prepare("SELECT * FROM jeu WHERE id=?");
    return Number(requete.get(id));
}
export{getJeu,ajouterJeu,listerJeux};