import db from "./database";

function afficherHistorique(id_ticket:number){
    const requete=db.prepare("SELECT * FROM intervention WHERE id_ticket=?");
    return requete.all(id_ticket);
}
function enregistrerIntervention(id_ticket:number,id_technicien:number,commentaire:string){
    const requete=db.prepare("INSERT INTO intervention(id_ticket,id_technicien,dateIntervention,commentaire) values(?,?,?,?)");
    const resultat=requete.run(id_ticket,id_technicien,new Date().toISOString,commentaire);
    return resultat.lastInsertRowid;
}
export{afficherHistorique,enregistrerIntervention};