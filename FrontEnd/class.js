//Objet générique pour générer les photos dans la galerie index
export class Figure {
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
//Objet générique pour affichage des photos de la modale
export class Div {
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
