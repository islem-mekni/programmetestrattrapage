import {ajouterContact,modifierContact,supprimerContact,listerContacts} from "./contact";
import Fastify from "fastify";
import cors from "@fastify/cors";


const fastify =Fastify();
async function demarrer(){
    await fastify.register(cors,{
        origin:"*",
        methods:["POST","GET","PUT","DELETE"],
    });
    fastify.get("/contacts",(request,reply)=>{
        return listerContacts();
    })
    fastify.post("/contacts",(request,reply)=>{
        const {nom,telephone,email}=request.body as{nom:string,telephone:number,email:string};
        return ajouterContact(nom,telephone,email);
    })
    fastify.put("/contacts/:id",(request,reply)=>{
        const {id}=request.params as {id:string};
        const {newtelephone}=request.body as {newtelephone:number};
        return modifierContact(newtelephone,Number(id));
    })
    fastify.delete("/contacts/:id",(request,reply)=>{
        const {id}=request.params as {id:string};
        return supprimerContact(Number(id));
    })
    await fastify.listen({port:8080});
    console.log("serveur est demarre sur http://localhost:8080");
}
demarrer()