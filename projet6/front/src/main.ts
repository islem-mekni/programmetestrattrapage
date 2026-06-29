const app=document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML=`
<h2>ajouter un contact</h2>
<input type="text" id="inputNomContact" placeholder="taper un nom">
<input type="text" id="inputTelephoneContact" placeholder="taper un numero de telephone">
<input type="text" id="inputEmailContact" placeholder="taper emeil">
<button id="boutonAjouter">Ajouter</button>
<ul id="listcontact"></ul>`

const nom=document.querySelector<HTMLInputElement>("#inputNomContact")!;
const telephone=document.querySelector<HTMLInputElement>("#inputTelephoneContact")!;
const email=document.querySelector<HTMLInputElement>("#inputEmailContact")!;
const boutonAjouter=document.querySelector<HTMLButtonElement>("#boutonAjouter")!;
const listcontact=document.querySelector<HTMLUListElement>("#listcontact")!;

type contact ={
  id:number;
  nom:string;
  telephone:number;
  email:string;
}
async function recupererContact() {
  const response=await fetch(`http://localhost:8080/contacts`);
  const contacts:contact[]=await response.json();
  afficherContact(contacts);
}
async function afficherContact(items:contact[]) {
  listcontact.innerHTML="";
  for (const item of items){
    const li=document.createElement("li");
    li.textContent=`${item.id}-${item.nom}-${item.telephone}-${item.email}`;
    const boutonSupprimer=document.createElement("button");
    boutonSupprimer.textContent="Supprimer";
    boutonSupprimer.addEventListener("click",() => {
      supprimerContact(item.id);
    });
    const boutonModifier=document.createElement("button");
    boutonModifier.textContent="Modifier";
    boutonModifier.addEventListener("click",()=>{
      const nouveautelephone=prompt("Nouveu telephone:");
      if (nouveautelephone){
        modifierContact(item.id,Number(nouveautelephone));
      }
      
    });
    li.appendChild(boutonSupprimer);
    li.appendChild(boutonModifier);
    listcontact.append(li);
  }
  

}
async function ajouterContact(){
  const nomcontact=nom.value;
  const emailcontact=email.value;
  const telephonecontact=Number(telephone.value);
  await fetch(`http://localhost:8080/contacts`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({nom:nomcontact,email:emailcontact,telephone:telephonecontact}),
    
  });
  nom.value= "";
  email.value= "";
  telephone.value= "";
  recupererContact();
}
boutonAjouter.addEventListener("click",()=>{
  ajouterContact();
})
async function modifierContact(id:number,newtelephone:number){
  await fetch(`http://localhost:8080/contacts/${id}`,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({newtelephone:newtelephone})
  });
  recupererContact();
}
async function supprimerContact(id:number) {
  await fetch(`http://localhost:8080/contacts/${id}`,{
    method:"DELETE"
  });
  recupererContact();
}
recupererContact();