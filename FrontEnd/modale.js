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




document.getElementById("addPhoto").onclick = function() {
    document.getElementById("retour").style.display = "block";
    document.getElementById("modale2").style.display = "flex";
    document.getElementById("titleModal").innerText = "Ajout photo";
    document.getElementById("modale1").style.display = "none";
    //document.querySelector(".formulaire").style.display = "flex";
    //document.getElementById("addPhoto").style.display = "none";
    document.getElementById("validation").style.display = "block";
    }
  
        const fleche = document.getElementById("retour");
       
        fleche.onclick = function() {
        document.getElementById("modale1").style.display = "flex";
        document.getElementById("modale2").style.display = "none";
        document.getElementById("titleModal").innerText = "Galerie photo";
     
    }
 

document.getElementById("closeModal").onclick = function() {
    const modale1 = document.getElementById("modal1");
    modale1.style.display="none";
    //modeEdition();
};
window.onclick = function(event) {
    const modale1 = document.getElementById("modal1");
    if (event.target == modale1) {
      modale1.style.display = "none";
    }
} 

    



