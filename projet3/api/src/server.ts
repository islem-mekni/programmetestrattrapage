import Fastify from "fastify";
import cors from "@fastify/cors";
import {afficherHistorique,enregistrerIntervention} from "./intervention";
import {ajouterTicket,changerStatut,listerTickets,getTicket} from "./ticket";


const fastify= Fastify();
async function commencer(){
    await fastify.register(cors,{
        origin:"*",
        methods:["GET","POST","PUT","DELETE"],
    
    })
    fastify.get("/tickets",async (request,reply)=>{
        return listerTickets();
    })
    fastify.post("/tickets",async(request,reply)=>{
        const {titre,description,statut,id_client}=request.body as {titre:string,description:string,statut:string,id_client:number};
        const id=ajouterTicket(titre,description,statut,id_client);
        return {id,titre,description,statut,id_client};
    })
    fastify.put("/tickets/:id", async(request,reply)=>{
        const id=request.params as {id:string};
        const nouveaustatus=request.body as string;
        return changerStatut(nouveaustatus,Number(id));
    })
    fastify.get("/tickets/:id/historique",(request,reply)=>{
        const id=request.params as {id:string};
        return afficherHistorique(Number(id));
    })
    fastify.post("/interventions",async(request,reply)=>{
        const {id_ticket,id_technicien,commentaire}=request.body as {id_ticket:string,id_technicien:string ,commentaire:string};
        enregistrerIntervention(Number(id_ticket),Number(id_technicien),commentaire);
    })
    fastify.listen({port:8080});
    console.log("serveur est lance sur /localhost:8080");
}
commencer();
