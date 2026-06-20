const app=document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML=`
  <h1>Gestion de stock</h1>
  <h2>Ajouter un produit</h2>
  <input type="text" id="nomProduit" placeholder="nom du produit"/>
  <input type="number" id="quantiteProduit" placeholder="quantite"/>
  <button id="boutonAjouter">Ajouter</button>
  <h2>Liste des produits</h2>
  <ul id="listeProduits"></ul>
`;
type Produit={
  id:number;
  nom:string;
  quantite:number;
};
const listeProduits=document.querySelector<HTMLUListElement>("#listeProduits")!;
async function recupererProduits(){
  const reponse=await fetch("http://localhost:8080/produits");
  const produits=await reponse.json();
  afficherProduits(produits);
}


const inputNom = document.querySelector<HTMLInputElement>("#nomProduit")!;
const inputQuantite = document.querySelector<HTMLInputElement>("#quantiteProduit")!;
const boutonAjouter = document.querySelector<HTMLButtonElement>("#boutonAjouter")!;
async function ajouterProduit(){
  const nom=inputNom.value;
  const quantite=Number(inputQuantite.value);
  await fetch("http://localhost:8080/produits",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({nom,quantite})
  });
  inputNom.value="";
  inputQuantite.value="";

  recupererProduits();
}
boutonAjouter.addEventListener("click", ajouterProduit);

async function afficherProduits(produits: Produit[]) {
  listeProduits.innerHTML = "";
  for (const produit of produits) {
    const item = document.createElement("li");
    item.textContent = `${produit.nom} - quantite : ${produit.quantite}`;

    const inputRetrait = document.createElement("input");
    inputRetrait.type = "number";
    inputRetrait.placeholder = "quantite a retirer";

    const boutonRetirer = document.createElement("button");
    boutonRetirer.textContent = "Retirer";
    boutonRetirer.addEventListener("click", () => {
      const quantiteARetirer = Number(inputRetrait.value);
      retirerQuantite(produit.id, quantiteARetirer);
    });

    const boutonHistorique = document.createElement("button");
    boutonHistorique.textContent = "Historique";
    boutonHistorique.addEventListener("click", () => {
      afficherHistorique(produit.id);
    });

    item.appendChild(inputRetrait);
    item.appendChild(boutonRetirer);
    item.appendChild(boutonHistorique);
    listeProduits.append(item);
  }
}

async function retirerQuantite(id: number, quantiteARetirer: number) {
  await fetch(`http://localhost:8080/produits/${id}/retirer`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantite: quantiteARetirer })
  });
  recupererProduits();
}

async function supprimerProduit(id: number) {
  await fetch(`http://localhost:8080/produits/${id}`, {
    method: "DELETE"
  });
  recupererProduits();
}
type Mouvement={
  id:number;
  id_produit:number;
  type:string;
  quantite:number;
}
async function afficherHistorique(produitid:number){
  const reponse=await fetch(`http://localhost:8080/produits/${produitid}/historique`);
  const mouvements: Mouvement[]=await reponse.json();
  let texte=`Historique du produit ${produitid}:\n`;
  for (const mouvement of mouvements){
    texte += `-${mouvement.type}(quantite:${mouvement.quantite})\n`;
  }
  alert(texte);
}
recupererProduits();