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
genererProjets(works);
