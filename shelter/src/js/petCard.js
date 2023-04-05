export class MainPetCard {
  constructor({
    id,
    name,
    img,
    type,
    breed,
    description,
    age,
    inoculations,
    diseases,
    parasites,
    ...rest
  }) {
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

  createMainPetCard() {
    const template = document.querySelector('#main-pet-card').content.querySelector('.pet-card');

    const element = template.cloneNode(true);

    // console.log(element);
    element.querySelector('.pet-img img').src = this.img;
    element.querySelector('.pet-name').textContent = this.name;

    return element;
  }
}
