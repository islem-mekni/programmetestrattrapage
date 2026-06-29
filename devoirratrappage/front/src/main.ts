import './style.css'
const app=document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML=`
  <h1>ajouter favoris</h1>
  <input type="text" id="inputNomF" placeholder="tape le nom du lien">
  <input type="text" id="inputURL" placeholder="colle l'url du lien">
  <button id="boutonAjouter">Ajouter</button>
  <ul id="listFavoris"></ul>
`;
const inputNomF=document.querySelector<HTMLInputElement>("#inputNomF")!;
const inputURL=document.querySelector<HTMLInputElement>("#inputURL")!;
const boutonAjouter=document.querySelector<HTMLButtonElement>("#boutonAjouter")!;
const listFavoris=document.querySelector<HTMLUListElement>("#listFavoris")!;

type favori={
  id:number,
  nom:string,
  url:string,
}

async function recupererFavoris(){
  const reponse=await fetch("http://localhost:8080/favoris");

  const items:favori[]=await reponse.json();
  afficherFavoris(items);
}

async function afficherFavoris(items:favori[]){
  listFavoris.innerHTML="";
  for (const item of items){
    const li=document.createElement("li");
    li.textContent=`${item.id}-${item.nom}-${item.url}`;

    const boutonSupprimer=document.createElement("button");
    boutonSupprimer.textContent="Supprimer";
    boutonSupprimer.addEventListener("click", () =>{
      supprimerFavoris(item.id);
    });
  li.appendChild(boutonSupprimer);
  listFavoris.append(li);
}
}
async function ajouterFavoris(){
  const nomf=inputNomF.value;
  const url=inputURL.value;
  await fetch("http://localhost:8080/favoris",{
  method:"POST",
  headers:{"Content-type":"application/json"},
  body:JSON.stringify({nom:nomf,url:url}),
  
  });
  inputNomF.value="";
  inputURL.value="";
  recupererFavoris()
}
boutonAjouter.addEventListener("click", ajouterFavoris);

async function supprimerFavoris(id:number){
  await fetch(`http://localhost:8080/favoris/${id}`,{
    method:"DELETE",

  });
  recupererFavoris();
}
recupererFavoris();