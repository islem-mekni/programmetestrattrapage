import {ajouterFavoris,listerFavoris,supprimerFavoris} from "./favoris";
import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify=Fastify();
async function demarrer(){
    await fastify.register(cors,  {
        origin:"*",
        methods:["GET","POST","PUT","DELETE"]

    });
    fastify.post("/favoris",(request,reply)=>{
        const {nom,url}=request.body as {nom:string, url:string};
        const id=ajouterFavoris(nom,url);
        return {id,nom,url};
    })
    fastify.get("/favoris",(request,reply)=>{
        return listerFavoris();
    })
    fastify.delete("/favoris/:id", async(request,reply)=>{
        const {id}=request.params as {id:string};
        const changements=supprimerFavoris(Number(id));

        return {supprime:changements>0};
    })
    await fastify.listen({port:8080})
    console.log("serveur est demarre sur http://localhost/8080")
}
demarrer();