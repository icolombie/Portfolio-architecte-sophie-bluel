//ouverture de la modale
document.getElementById("openModal1").onclick = function() {
    document.getElementById("modal1").style.display = "flex";
    document.getElementById("titleModal").innerText = "Galerie photo";
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
        const deleteIcone = document.createElement("button");
        deleteIcone.innerHTML = '<i class="fa-regular fa-trash-can">';
        deleteIcone.setAttribute("id", galerie.id);
        deleteIcone.classList.add("iconeSuppr");
        ficheGalerie.appendChild(deleteIcone);
        ficheGalerie.classList.add("ficheGalerie");
        const sectionGalerie = document.querySelector(".galerie");
        sectionGalerie.appendChild(ficheGalerie);  
       
    }
}
genererPhotos();



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
    const selectElement = document.getElementById("categorie");
    selectElement.appendChild(optionListe);
    }
}
genererListe();

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

//document.querySelector('.file-upload').addEventListener('click', function() {
    //document.getElementById('fileInput').click();
//});





    //retour vers la 1ère version de la modale avec flêche gauche
    const fleche = document.getElementById("retour");
    fleche.onclick = function() {
    document.getElementById("modale1").style.display = "flex";
    document.getElementById("modale2").style.display = "none";
    document.getElementById("titleModal").innerText = "Galerie photo";
     
    }
 
 //fermeture de la modale avec la croix
document.getElementById("closeModal").onclick = function() {
    const modale1 = document.getElementById("modal1");
    modale1.style.display="none";
 
};

//fermeture de la modale par click hors de la modale
window.onclick = function(event) {
    const modale1 = document.getElementById("modal1");
    if (event.target == modale1) {
      modale1.style.display = "none";
    }
} 

    



