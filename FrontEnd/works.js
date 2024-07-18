
//Ajout des boutons de tri
const barreBoutons = document.querySelector(".barreBoutons");
   const boutonTous = document.createElement("button");
   boutonTous.innerText = "Tous";
   boutonTous.classList.add("btntous");
   barreBoutons.appendChild(boutonTous);
   boutonTous.addEventListener("click", function () {
       const triCategory = works.filter(function (work) {
           return work.category.name;
       })
       document.querySelector(".gallery").innerHTML = "";
       genererProjets(triCategory);
   });




//Récupération dynamique des travaux
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

function genererProjets(works) {
    for (let i = 0; i < works.length; i++) {
        const projet = works[i];
        const ficheProjet = document.createElement("figure");
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        const nomProjet = document.createElement("figcaption");
        nomProjet.innerText = projet.title;
        const sectionProjets = document.querySelector(".gallery");
        sectionProjets.appendChild(ficheProjet);
        ficheProjet.appendChild(imageProjet);
        ficheProjet.appendChild(nomProjet); 

    }
};
//Récupération dynamique des catégories et création des boutons
async function genererBoutonsTri() {
    const request = await fetch("http://localhost:5678/api/categories");
    const listeCategories = await request.json();
    console.log(listeCategories);
    for (let i = 0; i < listeCategories.length; i++) {
    const category = listeCategories[i];
    const boutonTri = document.createElement("button");
    boutonTri.innerText = category.name;
    boutonTri.classList.add("btnTri");
    const barreBoutons = document.querySelector(".barreBoutons");
    barreBoutons.appendChild(boutonTri);
    boutonTri.addEventListener("click", function() {
    const triCategory = works.filter(function (work) {
        return work.category.name === boutonTri.textContent;   
    })
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(triCategory);
   });
}
};


function modeEdition() {
    const tokenValue = window.localStorage.getItem("token :");
    if (tokenValue) {
     document.getElementById("edition").style.display = "flex";
     document.getElementById("login").style.display = "none";
     document.getElementById("logout").style.display = "block";
     document.querySelector(".barreBoutons").style.display = "none";
     document.querySelector(".modification").style.display = "flex";
    } else {
      console.log("pas de token trouvé");
    }
    window.onbeforeunload = function (){
         window.localStorage.removeItem("token :");
    }
   };

   

modeEdition();

genererProjets(works);

genererBoutonsTri();
