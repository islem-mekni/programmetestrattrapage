import db from "./database";


function ajouterTicket(titre:string,description:string,statut:string,id_client:number){
    const requete=db.prepare("INSERT INTO ticket(titre,description,statut,id_client) values (?,?,?,?)");
    const resultat=requete.run(titre,description,statut,id_client);
    return Number(resultat.lastInsertRowid);
}
function changerStatut(nouveaustatus:string,id:number){
    const requete =db.prepare("UPDATE ticket set statut=? WHERE id=?");
    return requete.run(nouveaustatus,id).changes;
}
function listerTickets(){
    const requete =db.prepare("SELECT * FROM ticket");
    return requete.all();
}
function getTicket(id:number){
    const requete=db.prepare("SELECT * FROM ticket WHERE id=?");
    return requete.get(id);
}
export{ajouterTicket,changerStatut,listerTickets,getTicket};