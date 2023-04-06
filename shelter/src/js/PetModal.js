import { Modal } from './Modal.js';

export class PetModal extends Modal {
  constructor(
    classes,
    { id, name, img, type, breed, description, age, inoculations, diseases, parasites, ...rest },
  ) {
    super(classes);
    this.id = id;
    this.name = name;
    this.img = img;
    this.type = type;
    this.breed = breed;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
  }

  //   createMainPetCardModal() {
  //     const template = document.querySelector('#main-pet-card').content.querySelector('.pet-card');

  //     const element = template.cloneNode(true);

  //     // console.log(element);
  //     element.querySelector('.pet-img img').src = this.img;
  //     element.querySelector('.pet-name').textContent = this.name;
  //     element.setAttribute('data-id', this.id);
  //     return element;
  //   }

  createMainPetCardModal() {
    let template = '';
    const card = document.createElement('div');
    card.className = 'modal__pet-card';
    card.setAttribute('data-id', this.id);

    // const fragment = document.createDocumentFragment();
    // const createPhotoTemplate = (photo) => `<img src=${img} alt="${this.name}" />`;

    template += ` 
    
      <div class="modal__image"></div>
      <div class="modal__text">
        <h3 class="pet-name">${this.name}</h3>
        <h4 class="type breed">${this.type} - ${this.breed}</h4>
        <h5 class="description">${this.description}</h5>
        <h5 class=><span class="list age">Age:</span>${this.age}</h5>
        <h5 class=><span class="list inoculations">Inoculations:</span>${this.inoculations}</h5>
        <h5 class=><span class="list diseases">Diseases:</span>${this.diseases}</h5>
        <h5 class=><span class="list parasites">Parasites:</span>${this.parasites}</h5>`;

    card.innerHTML = template;

    return card;
  }

  renderModal() {
    let content = this.createMainPetCardModal();
    // console.log(content);
    super.buildModal(content);

    document.querySelector('.modal__image').style.backgroundImage = `url(${this.img})`;
  }
}
