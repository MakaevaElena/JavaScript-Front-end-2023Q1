import './style.css';

export default class GarageView {
    protected garageView: HTMLElement;
    private garage = document.createElement('div');
    private form = document.createElement('form');
    private inputCreateName = document.createElement('input');
    private inputUpdateName = document.createElement('input');
    private buttonCreateColor = document.createElement('button');
    private buttonUpdateColor = document.createElement('button');
    private buttonCreate = document.createElement('button');
    private buttonUpdate = document.createElement('button');
    private buttonRace = document.createElement('button');
    private buttonReset = document.createElement('button');
    private buttonGenerateCars = document.createElement('button');

    private raceRoads = document.createElement('div');
    private roadHeader = document.createElement('h2');
    private pageNumberHeader = document.createElement('h3');
    private carsList = document.createElement('div');
    private carsListData = ['Car1', 'Car2', 'Car3', 'Car4', 'Car5'];
    private currentPageNumber = 1;

    constructor() {
        this.garageView = this.createGarage();
        this.createForm();
        this.createRaceRoad();
    }

    getGarageView() {
        return this.garageView;
    }

    private createGarage() {
        this.garage.classList.add('garage');
        this.garage.append(this.form, this.raceRoads, this.carsList);
        return this.garage;
    }

    private createForm() {
        this.form.classList.add('form');
        this.inputCreateName.classList.add('create-name');
        this.buttonCreateColor.classList.add('create-color', 'button');
        this.buttonCreate.classList.add('button-create', 'button');
        this.inputUpdateName.classList.add('update-name');
        this.buttonUpdateColor.classList.add('update-color', 'button');
        this.buttonUpdate.classList.add('button-update', 'button');
        this.buttonRace.classList.add('button-race', 'button');
        this.buttonReset.classList.add('button-reset', 'button');
        this.buttonGenerateCars.classList.add('generate-cars', 'button');

        this.form.append(
            this.inputCreateName,
            this.buttonCreateColor,
            this.buttonCreate,
            this.inputUpdateName,
            this.buttonUpdateColor,
            this.buttonUpdate,
            this.buttonRace,
            this.buttonReset,
            this.buttonGenerateCars
        );
    }

    private createRaceRoad() {
        this.roadHeader.innerText = `Garage ${this.carsListData.length}`;
        this.pageNumberHeader.innerText = `Page #${this.currentPageNumber}`;

        this.carsListData.map((carData) => this.createCar(carData));
        this.raceRoads.append(this.roadHeader, this.pageNumberHeader, this.carsList);
    }

    //TODO создать класс для отдельной машины
    private createCar(carData: string) {
        const carBlock = document.createElement('div');
        carBlock.classList.add('car-block');
        carBlock.innerHTML = `${carData}`;
    }
}
