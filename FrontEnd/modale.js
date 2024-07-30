//ouverture de la modale
document.getElementById("openModal1").onclick = function() {
    document.getElementById("modal1").style.display = "flex";
    document.getElementById("titleModal").innerText = "Galerie photo";
    genererPhotos();
    
}


        
//Récupération dynamique des photos

async function genererPhotos() {
        const reponse = await fetch("http://localhost:5678/api/works");
        const works = await reponse.json();
    for (let i = 0; i < works.length; i++) {
        const galerie = works[i];
        const imageGalerie = document.createElement("img");
        imageGalerie.classList.add("imageModale");
        imageGalerie.src = galerie.imageUrl;
        imageGalerie.setAttribute("id", galerie.id);
        const ficheGalerie = document.createElement("div");
        ficheGalerie.appendChild(imageGalerie);
        const deleteIcon = document.createElement('button');
        deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        deleteIcon.id = galerie.id;
        deleteIcon.classList.add("iconeSuppr");
        ficheGalerie.appendChild(deleteIcon); 
        ficheGalerie.classList.add("ficheGalerie");
        const sectionGalerie = document.querySelector(".galerie");
        sectionGalerie.appendChild(ficheGalerie);  
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
    } else {
        throw new Error("Erreur lors de la suppression : " + response.status);
    }
});
}
}

   

    

//redirection vers modale 2e version
document.getElementById("addPhoto").onclick = function() {
    document.getElementById("retour").style.display = "block";
    document.getElementById("modale2").style.display = "flex";
    document.getElementById("titleModal").innerText = "Ajout photo";
    document.getElementById("modale1").style.display = "none";
    document.getElementById("validation").style.display = "block";
    }
  
//Récupération dynamique des catégories et création de la liste déroulante des catégories
async function genererListe() {
    const request = await fetch("http://localhost:5678/api/categories");
    const listeCategories = await request.json();
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
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('photo').src = e.target.result;
            document.querySelector('.modale2').style.display = "none";
            document.getElementById('photoDiv').style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});


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
    //let data;
      if (response.ok) {
        //data = 
        await response.json();
        console.log("Téléchargement réussi");
        genererPhotos();
      } else {
        throw new Error("Erreur lors du téléchargement : " + response.status);
      }
    }
    

document.getElementById('addWork').addEventListener('submit', sendRequest);




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
    const modale1 = document.getElementById("modal1");
    modale1.style.display="none";
    const modale2 = document.getElementById("modale2");
    modale2.style.display="none";
 
};

//fermeture de la modale par click hors de la modale
window.onclick = function(event) {
    const modale1 = document.getElementById("modal1");
    if (event.target == modale1) {
      modale1.style.display = "none";
    }
} 

    



