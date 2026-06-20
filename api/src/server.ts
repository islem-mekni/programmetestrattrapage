import Fastify from "fastify";
import cors from "@fastify/cors";
import{ajouterProduit,modifierProduit,supprimerProduit,listerProduit,getProduit} from "./produit";
import{enregistrerMouvement,historiqueProduit}from "./mouvement";

const fastify=Fastify();
async function demarrer(){
    await fastify.register(cors,{
        origin:"*",
        methods:["GET","POST","PUT","DELETE"]
    });
    fastify.get("/produits",async(request,reply)=>{
        return listerProduit();
    })
    fastify.post("/produits",async(request,reply)=>{
        const{nom,quantite}=request.body as {nom:string,quantite:number};
        const id =ajouterProduit(nom,quantite);
        enregistrerMouvement(id,"ajout",quantite);
        return {id,nom,quantite};
    })
    fastify.put("/produits/:id", async(request,reply)=>{
        const{quantite}=request.body as {quantite:number};
        const {id}=request.params as {id:string};
        modifierProduit(Number(id),quantite);
        enregistrerMouvement(Number(id),"modification",quantite);
        return{id:Number(id),quantite};
    });
    fastify.delete("/produits/:id",async(request,reply)=>{
        const {id}=request.params as {id:string};
        const produit=getProduit(Number(id)) as {id:string ,nom:string,quantite:number};
        let quantiteAvantSuppression=0;
        if (produit){
            quantiteAvantSuppression=produit.quantite;
        } 
        const changements=supprimerProduit(Number(id));
        enregistrerMouvement(Number(id),"supprision",0);
        return{supprime:changements>0};
});
    await fastify.listen({port:8080});
    console.log("serveur bde yekhdem sur http://localhost:8080");

}

demarrer();