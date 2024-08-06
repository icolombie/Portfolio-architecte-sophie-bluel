//ouverture de la modale et affichage des photos
document.getElementById("openModal1").onclick = function () {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("return").style.visibility = "hidden";
    document.getElementById("titleModal").innerText = "Galerie photo";
    document.getElementById("modal1").style.display = "flex";
    document.querySelector(".photoGallery").innerHTML = "";
    generatePhotos();
  };
  
  //Objet générique pour affichage des photos de la modale
  class Div {
    constructor(card) {
      this.card = card;
    }
    createDivElement() {
      const galleryCard = document.createElement("div");
      galleryCard.classList.add("galleryCard");
      const cardPhoto = document.createElement("img");
      cardPhoto.classList.add("modalPhoto");
      cardPhoto.src = this.card.imageUrl;
      cardPhoto.setAttribute("id", this.card.id);
      galleryCard.appendChild(cardPhoto);
  
      return galleryCard;
    }
  }
  
  //Récupération dynamique des photos et gestion de la suppression des photos
  async function generatePhotos() {
    const works = JSON.parse(localStorage.getItem("works"));
    for (let i = 0; i < works.length; i++) {
      const card = works[i];
      const div = new Div(card);
      const galleryCard = div.createDivElement();
      const gallerySection = document.querySelector(".photoGallery");
      gallerySection.appendChild(galleryCard);
      const deleteIcon = document.createElement("button");
      deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
      deleteIcon.id = card.id;
      deleteIcon.classList.add("iconeSuppr");
      galleryCard.appendChild(deleteIcon);
      deleteIcon.addEventListener("click", async function () {
        const id = card.id;
        const token = window.localStorage.getItem("token :");
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          console.log("Suppression réussie");
          gallerySection.removeChild(galleryCard);
          let works = JSON.parse(localStorage.getItem("works"));
          works = works.filter((work) => work.id !== id);
          localStorage.setItem("works", JSON.stringify(works));
          console.log("Photo supprimée et liste mise à jour :", works);
          const figure = document.getElementById(`id${id}`);
          figure.remove();
          console.log("galerie mise à jour");
        } else {
          throw new Error("Erreur lors de la suppression : " + response.status);
        }
      });
    }
  }
  
  //affichage modale 2e version
  document.getElementById("addPhoto").onclick = function () {
    document.getElementById("return").style.visibility = "visible";
    document.getElementById("modal2").style.display = "flex";
    document.getElementById("titleModal").innerText = "Ajout photo";
    document.getElementById("modal1").style.display = "none";
    document.getElementById("validation").style.display = "flex";
  };
  
  //Récupération dynamique des catégories et création de la liste déroulante des catégories
  async function createCategoryList() {
    const listeCategories = JSON.parse(localStorage.getItem("listeCategories"));
    console.log(listeCategories);
    for (let i = 0; i < listeCategories.length; i++) {
      const category = listeCategories[i];
      const listOption = document.createElement("option");
      listOption.innerText = category.name;
      listOption.classList.add("categoryOption");
      listOption.setAttribute("id", category.id);
      const selectElement = document.getElementById("selectCategory");
      selectElement.appendChild(listOption);
    }
  }
  createCategoryList();
  
  //Affichage de la photo chargée et gestion des erreurs de taille de la photo
  document.getElementById("fileInput").addEventListener("change", function (event) {
      let file = event.target.files[0];
      if (file) {
        const maxSize = 4 * 1024 * 1024;
        if (file.size > maxSize) {
          alert("La taille du fichier doit être inférieure ou égale à 4 Mo.");
          return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("photo").src = e.target.result;
          document.querySelector(".modal2").style.display = "none";
          document.getElementById("photoDiv").style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });
  
  //Objet générique pour générer les photos ajoutées dans la galerie de la page index
  class Figure {
    constructor(photoId, photoTitle, photoSrc) {
      this.photoId = photoId;
      this.photoTitle = photoTitle;
      this.photoSrc = photoSrc;
    }
    createFigureElement() {
      const figure = document.createElement("figure");
      figure.id = "id" + this.photoId;
      const img = document.createElement("img");
      img.src = this.photoSrc;
      img.alt = this.photoTitle;
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = this.photoTitle;
      figure.appendChild(img);
      figure.appendChild(figcaption);
  
      return figure;
    }
  }
  
  //requête d'ajout de photo dans le serveur et dans les galeries index et modale
  async function sendNewPhoto(event) {
    event.preventDefault();
    const fileElement = document.getElementById("fileInput").files[0];
    const formData = new FormData();
    formData.append("image", fileElement);
    console.log(fileElement);
    const title = document.getElementById("name").value;
    formData.append("title", title);
    console.log(title);
    const selectElement = document.getElementById("selectCategory");
    const photoCategory = selectElement.options[selectElement.selectedIndex].id;
    formData.append("category", photoCategory);
    console.log(photoCategory);
    const token = window.localStorage.getItem("token :");
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (response.ok) {
      const newWork = await response.json();
      console.log(newWork);
      const works = JSON.parse(localStorage.getItem("works"));
      works.push(newWork);
      localStorage.setItem(works, JSON.stringify(works));
      alert("Photo téléchargée avec succès et ajoutée à la galerie");
      const figure = new Figure(newWork.id, newWork.title, newWork.imageUrl);
      const photoCard = figure.createFigureElement();
      const photoSection = document.querySelector(".gallery");
      photoSection.appendChild(photoCard);
      const div = new Div(newWork);
      const galleryCard = div.createDivElement();
      const gallerySection = document.querySelector(".photoGallery");
      const deleteIcon = document.createElement("button");
      deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
      deleteIcon.id = newWork.id;
      deleteIcon.classList.add("iconeSuppr");
      galleryCard.appendChild(deleteIcon);
      gallerySection.appendChild(galleryCard);
      console.log("galerie mise à jour");
      document.getElementById("fileInput").value = "";
      document.getElementById("name").value = "";
      document.getElementById("selectCategory").selectedIndex = 0;
      document.getElementById("photoDiv").style.display = "none";
      document.querySelector(".modal2").style.display = "flex";
    } else {
      alert("Erreur lors du téléchargement : " + response.status);
    }
  }
  //vérification des champs du formulaire pour activation du bouton Valider
  document.getElementById("addWork").addEventListener("input", function () {
    const form = document.getElementById("addWork");
    const button = document.getElementById("validation");
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
    form.addEventListener("input", checkFormValidity);
    form.addEventListener("change", checkFormValidity);
  });
  
  document.getElementById("addWork").addEventListener("submit", sendNewPhoto);
  
  //retour vers la 1ère version de la modale avec flêche gauche
  const fleche = document.getElementById("return");
  fleche.onclick = function () {
    document.getElementById("modal1").style.display = "flex";
    document.getElementById("modal2").style.display = "none";
    document.getElementById("titleModal").innerText = "Galerie photo";
    fleche.style.visibility = "hidden";
  };
  
  //fermeture de la modale avec la croix
  document.getElementById("closeModal").onclick = function () {
    const modale = document.getElementById("modal");
    modale.style.display = "none";
    document.querySelector(".photoGallery").innerHTML = "";
  };
  
  //fermeture de la modale par click hors de la modale
  window.onclick = function (event) {
    const modale = document.getElementById("modal");
    if (event.target == modale) {
      modale.style.display = "none";
      document.querySelector(".photoGallery").innerHTML = "";
    }
  };