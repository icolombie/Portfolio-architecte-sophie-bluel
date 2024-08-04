
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

   async function fetchData(url, dataList) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      localStorage.setItem(dataList, JSON.stringify(data)); // Stocker les données dans le localStorage
      console.log('Données récupérées et stockées dans le localStorage');
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  }
  fetchData("http://localhost:5678/api/works", 'works');
  const works = JSON.parse(localStorage.getItem('works'));

  fetchData("http://localhost:5678/api/categories",'listeCategories');
  const listeCategories = JSON.parse(localStorage.getItem('listeCategories')); 
 
    
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


export function genererProjets(works) {
    for (let i = 0; i < works.length; i++) {
        const projet = works[i];
        const figure = new Figure(projet.id, projet.title, projet.imageUrl);
        const ficheProjet = figure.createFigureElement();
        const sectionProjets = document.querySelector(".gallery");
        sectionProjets.appendChild(ficheProjet);
    }
};
//Récupération dynamique des catégories et création des boutons
async function genererBoutonsTri() {
    //const request = await fetch("http://localhost:5678/api/categories");
    //const listeCategories = await request.json();
    //localStorage.setItem('listeCategories', JSON.stringify(listeCategories));
    const listeCategories = JSON.parse(localStorage.getItem('listeCategories'));
    for (let i = 0; i < listeCategories.length; i++) {
    const category = listeCategories[i];
    const boutonTri = document.createElement("button");
    boutonTri.innerText = category.name;
    boutonTri.classList.add("btnTri");
    const barreBoutons = document.querySelector(".barreBoutons");
    barreBoutons.appendChild(boutonTri);
    boutonTri.addEventListener("click", function() {
        const works = JSON.parse(localStorage.getItem('works'));
        //console.log(Array.isArray(works)); // Devrait retourner true si works est un tableau
        //console.log(works); // Afficher le contenu de works
    const triCategory = works.filter(function (work) {
        return work.category.name === boutonTri.textContent;   
    })
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(triCategory);
    
   });
}
};

//Activation du mode édition
function modeEdition() {
    const tokenValue = window.localStorage.getItem("token :");
    if (tokenValue) {
     document.getElementById("edition").style.display = "flex";
     document.getElementById("login").style.display = "none";
     document.getElementById("logout").style.display = "block";
     document.querySelector(".barreBoutons").style.display = "none";
     document.querySelector(".modification").style.display = "flex";
     //document.querySelector(".gallery").innerHTML = "";
     
    } else {
      console.log("pas de token trouvé");
    }
    document.getElementById("logout").onclick= function (){
        window.localStorage.removeItem("token :");
   }
}


   

modeEdition();

genererProjets(works);

genererBoutonsTri();


//window.addEventListener('beforeunload', () => {
 // localStorage.removeItem('works');
 // localStorage.removeItem('listeCategories'); // Supprimer les données du localStorage
  //console.log('Données du localStorage supprimées');
//});
      
//window.localStorage.removeItem('liste2');
  
    