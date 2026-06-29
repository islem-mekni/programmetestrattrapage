import db from "./database";

function ajouterContact(nom:string,telephone:number,email:string){
    const requete=db.prepare("INSERT INTO contact(nom,telephone,email) VALUES (?,?,?)");
    const resultat=requete.run(nom,telephone,email);
    return Number(resultat.lastInsertRowid);
}
function modifierContact(newtelephone:number,id:number){
    const requete=db.prepare("UPDATE contact SET telephone=? WHERE id=?");
    const resultat=requete.run(newtelephone,id);
    return resultat.changes;
}
function supprimerContact(id:number){
    const requete=db.prepare("DELETE FROM contact WHERE id=?");
    return requete.run(id).changes;
}
function listerContacts(){
    const requete=db.prepare("SELECT * FROM contact");
    return requete.all();
}
export {ajouterContact,modifierContact,supprimerContact,listerContacts};