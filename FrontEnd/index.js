import { Figure, Div } from "./class.js";


document.addEventListener("DOMContentLoaded", main);

async function main() {

//Requêtes de récupération des données Works et Categories dans le serveur
const works = await getData("http://localhost:5678/api/works");

const categories = await getData("http://localhost:5678/api/categories");


//Ajout du bouton "Tous" et de sa fonction de tri
const buttonBar = document.querySelector(".buttonBar");
const allButton = document.createElement("button");
allButton.innerText = "Tous";
allButton.classList.add("allBtn");
buttonBar.appendChild(allButton);
allButton.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  createPhotoCards(works);
});

  //Récupération dynamique des catégories et création des boutons de tri et de leur fonction de tri
  function createSortButtons() {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const sortButton = document.createElement("button");
      sortButton.innerText = category.name;
      sortButton.classList.add("sortBtn");
      const buttonBar = document.querySelector(".buttonBar");
      buttonBar.appendChild(sortButton);
      sortButton.addEventListener("click", function () {
        const sortCategory = works.filter(function (work) {
          return work.category.name === sortButton.textContent;
        });
        const gallerySection = document.querySelector(".gallery");
        gallerySection.innerHTML = "";
        createPhotoCards(sortCategory);
      });
    }
  }

//Fonction générique de requête pour récupérer les données du serveur
async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Erreur lors de la récupération des données");
    console.error("Erreur lors de la récupération des données :", error);
  }
}

//Fonction pour générer les photos dans la galerie
function createPhotoCards(works) {
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    const figure = new Figure(work.id, work.title, work.imageUrl);
    const photoCard = figure.createFigureElement();
    const gallerySection = document.querySelector(".gallery");
    gallerySection.appendChild(photoCard);
  }
}
  //Activation du mode édition et du logout
  function editionMode() {
    const tokenValue = window.localStorage.getItem("token :");
    if (tokenValue) {
      document.getElementById("edition").style.display = "flex";
      document.getElementById("login").style.display = "none";
      document.getElementById("logout").style.display = "block";
      document.querySelector(".buttonBar").style.display = "none";
      document.querySelector(".modification").style.display = "flex";
    } else {
      console.log("pas de token trouvé");
    }
    document.getElementById("logout").onclick = function () {
      window.localStorage.removeItem("token :");
      document.getElementById("edition").style.display = "none";
      document.getElementById("login").style.display = "block";
      document.getElementById("logout").style.display = "none";
      document.querySelector(".buttonBar").style.display = "flex";
      document.querySelector(".modification").style.display = "none";
    };
  }

  editionMode();

  createPhotoCards(works);

  createSortButtons();

  //ouverture de la modale et affichage des photos
  document.getElementById("openModal1").onclick = async function () {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("return").style.visibility = "hidden";
    document.getElementById("titleModal").innerText = "Galerie photo";
    document.getElementById("modal1").style.display = "flex";
    document.querySelector(".photoGallery").innerHTML = "";
    const data = await getData("http://localhost:5678/api/works");
    generatePhotos(data);
    };
    

  //Requête DELETE pour suppression des photos
  async function deleteItem(card) {
    const token = window.localStorage.getItem("token :");
    const id = card.id;
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return response;
    } else {
      throw new Error("Erreur lors de la suppression : " + response.status);
    }
  }

  //Récupération dynamique des photos et gestion de la suppression des photos
  async function generatePhotos(works) {
    for (let i = 0; i < works.length; i++) {
      const card = works[i];
      const div = new Div(card);
      const galleryCard = div.createDivElement();
      const gallerySection = document.querySelector(".photoGallery");
      gallerySection.appendChild(galleryCard);
      const deleteIcon = document.createElement("button");
      deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
      deleteIcon.id = card.id;
      deleteIcon.classList.add("deleteIcon");
      galleryCard.appendChild(deleteIcon);
      deleteIcon.addEventListener("click", function () {
        try {
          deleteItem(card);
          gallerySection.removeChild(galleryCard);
          const id = card.id;
          const figure = document.getElementById(`id${id}`);
          document.querySelector(".gallery").removeChild(figure);
        } catch (error) {
          alert("Erreur lors de la suppression");
          throw new Error("Erreur lors de la suppression");
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
  async function createCategoryList(categories) {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const listOption = document.createElement("option");
      listOption.innerText = category.name;
      listOption.classList.add("categoryOption");
      listOption.setAttribute("id", category.id);
      const selectElement = document.getElementById("selectCategory");
      selectElement.appendChild(listOption);
    }
  }

  createCategoryList(categories);

  //Affichage de la photo chargée et gestion des erreurs de taille de la photo
  document
    .getElementById("fileInput")
    .addEventListener("change", function (event) {
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
    
  //Fonction de requête POST et ajout de photo
  async function postItem(formData) {
    const token = window.localStorage.getItem("token :");
    try {
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
        deleteIcon.classList.add("deleteIcon");
        galleryCard.appendChild(deleteIcon);
        gallerySection.appendChild(galleryCard);
      } else {
        throw new Error("Erreur lors de la suppression : " + response.status);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'élément :", error);
    }
  }

  //Fonction d'ajout de photo dans le serveur et dans les galeries index et modale
  async function sendNewPhoto(event) {
    event.preventDefault();
    const fileElement = document.getElementById("fileInput").files[0];
    const formData = new FormData();
    formData.append("image", fileElement);
    const title = document.getElementById("name").value;
    formData.append("title", title);
    const selectElement = document.getElementById("selectCategory");
    const photoCategory = selectElement.options[selectElement.selectedIndex].id;
    formData.append("category", photoCategory);
    try {
      await postItem(formData);
      document.getElementById("addWork").reset();
      document.getElementById("photoDiv").style.display = "none";
      document.querySelector(".modal2").style.display = "flex";
      document.getElementById("validation").className = "disabled";
      alert("Photo téléchargée avec succès et ajoutée à la galerie");
    } catch (error) {
      alert("Erreur lors du téléchargement");
      console.error("Erreur lors du téléchargement :", error);
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
}

