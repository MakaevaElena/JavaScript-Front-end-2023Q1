import Api from '../../api';
import CarView from '../../components/car-view/car-view';
import { CarsType, CarType } from '../../types/types';
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
    private carsListElement = document.createElement('div');
    private carsListData!: CarsType;
    private currentPageNumber = 1;
    private api = new Api();
    private carView!: CarView;

    constructor() {
        this.getCars();
        this.garageView = this.createGarage();
        this.createForm();
    }

    getGarageView() {
        return this.garageView;
    }

    private async getCars() {
        this.carsListData = await this.api.getCars();
        this.createRaceRoad();
    }

    private createGarage() {
        this.garage.classList.add('garage');
        this.garage.append(this.form, this.raceRoads);
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
        console.log(this.carsListData);
        this.raceRoads.classList.add('race-road');
        this.roadHeader.innerText = `Garage (${this.carsListData.length})`;
        this.pageNumberHeader.innerText = `Page #${this.currentPageNumber}`;
        this.carsListElement.classList.add('cars-list');

        this.carsListData.map((carData) => {
            this.carView = new CarView(carData);
            this.carView.createCarBlock(this.carsListElement);
        });
        this.raceRoads.append(this.roadHeader, this.pageNumberHeader, this.carsListElement);
    }
}
