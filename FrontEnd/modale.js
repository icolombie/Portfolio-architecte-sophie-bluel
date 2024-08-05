import { genererProjets } from "./works.js";


//ouverture de la modale

document.getElementById("openModal1").onclick = function() {
    document.getElementById("modal1").style.display = "flex";
    document.getElementById("retour").style.visibility = "hidden";
    document.getElementById("titleModal").innerText = "Galerie photo";
    document.getElementById("modale1").style.display = "flex";
    document.querySelector(".galerie").innerHTML = "";
    genererPhotos();
    
}
class Div {
    constructor(galerie) {
        this.galerie = galerie;
    }

    createDivElement() {
        // Créer l'élément div pour la galerie
        const ficheGalerie = document.createElement('div');
        ficheGalerie.classList.add('ficheGalerie');

        // Créer l'élément img
        const imageGalerie = document.createElement('img');
        imageGalerie.classList.add('imageModale');
        imageGalerie.src = this.galerie.imageUrl;
        imageGalerie.setAttribute('id', this.galerie.id);

        // Ajouter l'image à la div
        ficheGalerie.appendChild(imageGalerie);

        // Créer l'élément bouton pour la suppression
        

        return ficheGalerie;
    }
}

//const reponse = await fetch("http://localhost:5678/api/works");
//const works = await reponse.json();
//const works = JSON.parse(localStorage.getItem('works'));       
//Récupération dynamique des photos

async function genererPhotos() {
    const works = JSON.parse(localStorage.getItem('works'));
    for (let i = 0; i < works.length; i++) {
        const galerie = works[i];
       // works.forEach(galerie, id => {
          //  if (!document.getElementById(`photo${id}`)) {
            const div = new Div(galerie);
            const ficheGalerie = div.createDivElement();
        const sectionGalerie = document.querySelector(".galerie");
        sectionGalerie.appendChild(ficheGalerie); 
        const deleteIcon = document.createElement('button');
        deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        deleteIcon.id = galerie.id;
        deleteIcon.classList.add('iconeSuppr');
        ficheGalerie.appendChild(deleteIcon);
        
    
    deleteIcon.addEventListener('click', async function() {
    const id = galerie.id; // récupère l'id de l'image
    const token = window.localStorage.getItem("token :");
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
        console.log("Suppression réussie");
        // Supprime l'image et le bouton de la galerie
        sectionGalerie.removeChild(ficheGalerie);
        
        let works = JSON.parse(localStorage.getItem('works'));
        works = works.filter(work => work.id !== id);
        localStorage.setItem('works', JSON.stringify(works));
        console.log('Photo supprimée et liste mise à jour :', works);
        const figure = document.getElementById(`id${id}`);
        figure.remove();
        //genererGalerie();
        console.log('galerie mise à jour');
     
    } else {
        throw new Error("Erreur lors de la suppression : " + response.status);
    }
});
}
}
//Mettre à jour la galerie
async function genererGalerie() {
    const galerie = document.querySelector('.gallery');
    galerie.innerHTML = ''; // Vider la galerie existante
    genererProjets(works);
}

    

//redirection vers modale 2e version
document.getElementById("addPhoto").onclick = function() {
    document.getElementById("retour").style.visibility = "visible";
    document.getElementById("modale2").style.display = "flex";
    document.getElementById("titleModal").innerText = "Ajout photo";
    document.getElementById("modale1").style.display = "none";
    document.getElementById("validation").style.display = "flex";
    }
  
//Récupération dynamique des catégories et création de la liste déroulante des catégories
async function genererListe() {
    //const request = await fetch("http://localhost:5678/api/categories");
    //const listeCategories = await request.json();
    const listeCategories = JSON.parse(localStorage.getItem('listeCategories'));
    console.log(listeCategories);
    for (let i = 0; i < listeCategories.length; i++) {
    const category = listeCategories[i];
    const optionListe = document.createElement("option");
    optionListe.innerText = category.name;
    optionListe.classList.add("optionCategorie");
    optionListe.setAttribute("id", category.id);
    const selectElement = document.getElementById("selectCategorie");
    selectElement.appendChild(optionListe);
    }
}
genererListe();

//Affichage de la photo chargée
document.getElementById('fileInput').addEventListener('change', function(event) {
    let file = event.target.files[0];
    if (file) {
        const maxSize = 4 * 1024 * 1024; // 4 Mo
        if (file.size > maxSize) {
            alert('La taille du fichier doit être inférieure ou égale à 4 Mo.');
            return; // Arrêter l'exécution si la taille est trop grande
        }
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('photo').src = e.target.result;
            document.querySelector('.modale2').style.display = "none";
            document.getElementById('photoDiv').style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

class Figure {
    constructor(photoId, photoTitle, photoSrc) {
        this.photoId = photoId;
        this.photoTitle = photoTitle;
        this.photoSrc = photoSrc;
    }

    createFigureElement() {
        // Créer l'élément figure
        const figure = document.createElement('figure');
        figure.id = 'id' + this.photoId;

        // Créer l'élément img
        const img = document.createElement('img');
        img.src = this.photoSrc;
        img.alt = this.photoTitle;

        // Créer l'élément figcaption
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = this.photoTitle;

        // Ajouter img et figcaption à figure
        figure.appendChild(img);
        figure.appendChild(figcaption);

        return figure;
    }
}

//requête d'ajout de photo
  async function sendRequest(event) {
    event.preventDefault();
    const fichier = document.getElementById('fileInput').files[0];
    const formData = new FormData();
    formData.append("image", fichier);
    console.log(fichier);
    const imageTitre = document.getElementById('name').value;
    formData.append("title", imageTitre);
    console.log(imageTitre);
    const selectElement = document.getElementById('selectCategorie');
    const imageCatégorie = selectElement.options[selectElement.selectedIndex].id;
    formData.append("category", imageCatégorie);
    console.log(imageCatégorie);
   

    const token = window.localStorage.getItem("token :");
    const response = await fetch('http://localhost:5678/api/works', {
    method:'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    body: formData
})
    
      if (response.ok) {
        
        const newWork = await response.json();
        console.log(newWork);
        const works = JSON.parse(localStorage.getItem('works'));
        works.push(newWork);
        localStorage.setItem(works, JSON.stringify(works));
        console.log("Téléchargement réussi");
        const figure = new Figure(newWork.id, newWork.title, newWork.imageUrl);
        const ficheProjet = figure.createFigureElement();
        const sectionProjets = document.querySelector(".gallery");
        sectionProjets.appendChild(ficheProjet);
        const div = new Div(newWork);
        const ficheGalerie = div.createDivElement();
        const sectionGalerie = document.querySelector(".galerie");

        
        const deleteIcon = document.createElement('button');
        deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        deleteIcon.id = galerie.id;
        deleteIcon.classList.add('iconeSuppr');
        ficheGalerie.appendChild(deleteIcon);
        sectionGalerie.appendChild(ficheGalerie); 
        console.log('galerie mise à jour');
        document.getElementById('fileInput').value = "";
        document.getElementById('name').value = "";
        document.getElementById('selectCategorie').selectedIndex = 0;
        document.getElementById('photoDiv').style.display = "none";
        document.querySelector(".modale2").style.display = "flex";

        
        
        
        
      } else {
        throw new Error("Erreur lors du téléchargement : " + response.status);
      }
    }
    //vérification des champs du formulaire pour activation du bouton Valider
    //document.addEventListener('DOMContentLoaded', (event) => {
        document.getElementById('addWork').addEventListener('input', function() {
            const form = document.getElementById('addWork');
            const button = document.getElementById('validation');

            function checkFormValidity() {
                const isValid = form.checkValidity();
                if (isValid) {
                    button.disabled = false;
                    button.className = "enabled";
                } else {
                    button.disabled = true;
                    button.className = "disabled";
                }
            }

            form.addEventListener('input', checkFormValidity);
            form.addEventListener('change', checkFormValidity);
        });
         
        //})   

document.getElementById('addWork').addEventListener('submit', sendRequest);

//|| []


    //retour vers la 1ère version de la modale avec flêche gauche
    const fleche = document.getElementById("retour");
    fleche.onclick = function() {
    document.getElementById("modale1").style.display = "flex";
    document.getElementById("modale2").style.display = "none";
    document.getElementById("titleModal").innerText = "Galerie photo";
    fleche.style.visibility = "hidden";
     
    }
 
 //fermeture de la modale avec la croix
document.getElementById("closeModal").onclick = function() {
    const modale = document.getElementById("modal1");
    modale.style.display="none";
    document.querySelector(".galerie").innerHTML = "";
    //genererGalerie();

   
    
 
};

//fermeture de la modale par click hors de la modale
window.onclick = function(event) {
    const modale = document.getElementById("modal1");
    if (event.target == modale) {
      modale.style.display = "none";
      document.querySelector(".galerie").innerHTML = "";
      //genererGalerie();
    }
      

    
    //openModal1;
} 

    
//avant dans fonction genererPhotos
//const imageGalerie = document.createElement("img");
        //imageGalerie.classList.add("imageModale");
        //imageGalerie.src = galerie.imageUrl;
        //imageGalerie.setAttribute("id", galerie.id);
        //const ficheGalerie = document.createElement("div");
        //ficheGalerie.appendChild(imageGalerie);
        //const deleteIcon = document.createElement('button');
        //deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        //deleteIcon.id = galerie.id;
        //deleteIcon.classList.add("iconeSuppr");
        //ficheGalerie.appendChild(deleteIcon); 
        //ficheGalerie.classList.add("ficheGalerie");

