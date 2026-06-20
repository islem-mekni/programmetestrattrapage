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

    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.textContent = "Supprimer";
    boutonSupprimer.addEventListener("click", () => {
      supprimerProduit(produit.id);
    });

    item.appendChild(boutonSupprimer);
    listeProduits.append(item);
  }
}

async function supprimerProduit(id: number) {
  await fetch(`http://localhost:8080/produits/${id}`, {
    method: "DELETE"
  });
  recupererProduits();
}