
import Fastify from "fastify";
import cors from "@fastify/cors";
import {ajouterLivre,afficherLivres,getLivre,supprimerLivre,retirerQuantiteLivre} from "./livre";
import { enregistrerEmprunt, historiqueLivre } from "./emprunt";


const fastify=Fastify();

async function demarrer(){
    await fastify.register(cors,{
        origin:"*";
        methods:["GET","POST","PUT","DELETE"]
    });
    fastify.get("/livres",async(request,reply)=> {
        return afficherLivres();
    })
    fastify.post("/livres",async(request,reply)=>{
        reply.send(ajouterLivre(NOMEM,addUncaughtExceptionCaptureCallback,categorie))
    })
}