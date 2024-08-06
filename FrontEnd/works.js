//Ajout du bouton "Tous" et de sa fonction de tri
const buttonBar = document.querySelector(".buttonBar");
   const allButton = document.createElement("button");
   allButton.innerText = "Tous";
   allButton.classList.add("allBtn");
   buttonBar.appendChild(allButton);
   allButton.addEventListener("click", function () {
       const sortCategory = works.filter(function (work) {
           return work.category.name;
       })
       document.querySelector(".gallery").innerHTML = "";
       createPhotoCards(sortCategory);
   });

//Requêtes de récupération des données Works et Categories dans le serveur et stockage dans le local storage  
  fetchData("http://localhost:5678/api/works", 'works');
  const works = JSON.parse(localStorage.getItem('works'));

  fetchData("http://localhost:5678/api/categories",'listeCategories');
  const listeCategories = JSON.parse(localStorage.getItem('listeCategories')); 
 
  
  
 //Fonction générique de requête pour récupérer les données du serveur
  async function fetchData(url, dataList) {
   try {
     const response = await fetch(url);
     const data = await response.json();
     localStorage.setItem(dataList, JSON.stringify(data));
     console.log('Données récupérées et stockées dans le localStorage');
   } catch (error) {
     console.error('Erreur lors de la récupération des données :', error);
   }
 }

  //Objet générique pour générer les photos dans la galerie    
  class Figure {
    constructor(photoId, photoTitle, photoSrc) {
        this.photoId = photoId;
        this.photoTitle = photoTitle;
        this.photoSrc = photoSrc;
    }
    createFigureElement() {
        const figure = document.createElement('figure');
        figure.id = 'id' + this.photoId;
        const img = document.createElement('img');
        img.src = this.photoSrc;
        img.alt = this.photoTitle;
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = this.photoTitle;
        figure.appendChild(img);
        figure.appendChild(figcaption);

        return figure;
    }
}

editionMode();

createPhotoCards(works);
  
createSortButtons();

//Fonction pour générer les photos dans la galerie   
function createPhotoCards(works) {
    for (let i = 0; i < works.length; i++) {
        const projet = works[i];
        const figure = new Figure(projet.id, projet.title, projet.imageUrl);
        const ficheProjet = figure.createFigureElement();
        const sectionProjets = document.querySelector(".gallery");
        sectionProjets.appendChild(ficheProjet);
    }
};
//Récupération dynamique des catégories et création des boutons de tri et de leur fonction de tri
async function createSortButtons() {
    const listeCategories = JSON.parse(localStorage.getItem('listeCategories'));
    for (let i = 0; i < listeCategories.length; i++) {
    const category = listeCategories[i];
    const sortButton = document.createElement("button");
    sortButton.innerText = category.name;
    sortButton.classList.add("sortBtn");
    const buttonBar = document.querySelector(".buttonBar");
    buttonBar.appendChild(sortButton);
    sortButton.addEventListener("click", function() {
        const works = JSON.parse(localStorage.getItem('works'));
    const sortCategory = works.filter(function (work) {
        return work.category.name === sortButton.textContent;   
    })
    document.querySelector(".gallery").innerHTML = "";
    createPhotoCards(sortCategory);
   });
}
};

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
    document.getElementById("logout").onclick= function (){
        window.localStorage.removeItem("token :");
        document.getElementById("edition").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("logout").style.display = "none";
        document.querySelector(".buttonBar").style.display = "flex";
        document.querySelector(".modification").style.display = "none";
   }
}


   




    