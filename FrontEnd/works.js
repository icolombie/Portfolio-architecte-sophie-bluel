import { modeEdition } from "./connexion.js";

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
}
modeEdition();
genererProjets(works);



//Ajout des boutons de tri
const barreBoutons = document.querySelector(".barreBoutons");
const boutonTous = document.createElement("button");
boutonTous.innerText = "Tous";
boutonTous.classList.add("btntous");
barreBoutons.appendChild(boutonTous);
const boutonObjets = document.createElement("button");
boutonObjets.classList.add("btnObjets");
boutonObjets.innerText = "Objets";
barreBoutons.appendChild(boutonObjets);
const boutonAppart = document.createElement("button");
boutonAppart.classList.add("btnAppart");
boutonAppart.innerText = "Appartements";
barreBoutons.appendChild(boutonAppart);
const boutonsHotels = document.createElement("button");
boutonsHotels.classList.add("btnResto");
boutonsHotels.innerText = "Hotels & Restaurants";
barreBoutons.appendChild(boutonsHotels);


//gestion des boutons de tri
boutonObjets.addEventListener("click", function () {
    const triObjets = works.filter(function (work) {
        return work.category.name === "Objets";
    })
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(triObjets);
});
boutonAppart.addEventListener("click", function () {
    const triObjets = works.filter(function (work) {
        return work.category.name === "Appartements";
    })
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(triObjets);
});
boutonsHotels.addEventListener("click", function () {
    const triObjets = works.filter(function (work) {
        return work.category.name === "Hotels & restaurants";
    })
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(triObjets);
});
boutonTous.addEventListener("click", function () {
    const triObjets = works.filter(function (work) {
        return work.category.name;
    })
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(triObjets);
});

const boutonLogout = document.getElementById("logout");
boutonLogout.addEventListener("click", function() {
    window.localStorage.removeItem("token");
});

