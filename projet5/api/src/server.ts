import db from "./database"
import {getJeu,ajouterJeu,listerJeux} from "./jeu";
import {ajouterEmprunt,listerEmprunt} from "./emprunt";
import Fastify from "fastify";
import cors from "@fastify/cors";
const fastify=Fastify();
async function demarrer(){
    fastify.register(cors,{
        origin:"*",
        methods:["GET","POST","DELETE","PUT"],
    });
    fastify.get("/jeux",(request,reply)=>{
        return listerJeux();
    });
    fastify.post("/jeux",(request,reply)=>{
        const {nom,nbremax}=request.body as {nom:string,nbremax:number};
        return ajouterJeu(nom,nbremax);
    })
    fastify.get("/emprunts",(request,reply)=>{
        const{nom}=request.body as {nom:string};
        return listerEmprunt(nom);
    })
    fastify.post("/emprunt/:id_jeu",(request,reply)=>{
        const{id_jeu}=request.params as {id_jeu:string};
        const {nom}=request.body as {nom:string};
        return ajouterEmprunt(Number(id_jeu),nom);
    })
    fastify.listen({port:8080});
    console.log("serveur est demarre sur http://localhost:8080");
}
demarrer();