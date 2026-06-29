import './style.css'
const app=document.getElementById("app")!;

app.innerHTML=`
  <h1>Jeux disponibles</h1>
  <ul id="listJeux></ul>
  <h2>Ajouter un jeu</h2>
  <input type="text" id="inputNomJeu" placeholder="taper un nom">
  <button id="boutonAjouter">Ajouter</button>
  <h2>Emprunt un jeu</h2>
  <input type="text" id="inputIdJeu" placeholder="ID DE JEU">
  <button id ="boutonEmprunter"></button>
  <h2>Liste emprunt par personne</h2>
  <input type="text" id="innputNomCherhe" placeholder="tape un nom">
  <button id="boutonchercher"></buttonn> 
  <ul id="listeemprunt"></ul>
`;
type jeu={
  id:number;
  nom:string;
  nbremax:number;
  diponibilte:number;
}
type emprunt={
  id:number;
  nom:string;
  date:string;
  id_jeu:number;
}
async function recuperJeu(){
  const reponse=await fetch("http://localhost:8080/jeux");
  const items:jeu[]= await reponse.json();
  afficherJeu(items);
}
async function afficherJeu(items:jeu){
  listJeux.innerHTML="";
  for (const item of items){
    const li=document.createElement("li");
    li.textContent=`${jeu.id}-${jeu.nom}-${jeu.nbremax}-${jeu.diponibilte}`;
    listJeux.append(li);
  }
}
async function ajouterJeu(){
  const nom=inputNomJeu.value;
  const nbremax=Number(in )
} 