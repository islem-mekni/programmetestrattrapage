const app=document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML=`
  <h1>Ajouter une salle</h1>
  <input type="text" id="inputsalle" placeholder="ajouter une salle">
  <button id="boutonAjouter">Ajouter</button>
  <ul id="listesalles"></ul>
`;

const inputsalle=document.querySelector<HTMLInputElement>("#inputsalle")!;
const buttonAjouter=document.querySelector<HTMLButtonElement>("#boutonAjouter")!;
const listesalles=document.querySelector<HTMLUListElement>("#listesalles")!;

type salle ={
  id:number;
  nom:string;
  capacite:number;

}
type reservation ={
  id:number;
  id_salle:number;
  nomReservant:string;
  dateReservation:string;
  heureDebut:string;
  heureFin:string;
}
async function commencer(){
  
}
async function recupereSalle(){
  const reponse= await fetch("http://localhost:8080/salles");
  const salles:salle[]=await reponse.json[];
  afficherSalle(salles);
}
const boutonReserver=document.querySelector<HTMLButtonElement>("#bouttonReserver"!);
function afficherSalle(salles: salle[]) {
  listesalles.innerHTML = "";
  
  for (const salle of salles) {
    const item = document.createElement("li");
    item.textContent = `${salle.nom} - ${salle.capacite}`;
    const bouttonReserver =document.createElement("button");
    bouttonReserver.textContent="Reserver";
    bouttonReserver.addEventListener("click",()=>{
      reserverSalle(salle.id);
    });
    item.appendChild(bouttonReserver);
    listesalles.append(item);
  }

  recupereSalle();
}
const inputNomSalle=document.querySelector<HTMLInputElement>("#inputNomSalle")!;
const inputCapacite=document.querySelector<HTMLInputElement>("#inputCapacite")!;
const buttonAjouterSalle=document.querySelector<HTMLButtonElement>("#buttonAjouterSalle")!;

function  ajouterSalle(salles:salle[]){
  const nom=inputNomSalle.value;
  const capacite=Number(inputCapacite.value);
  await fetch("http://localhost/salles",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({nom,capacite})
  });
  inputCapacite.value="";
  inputNomSalle.value="";
  recupereSalle();
}

