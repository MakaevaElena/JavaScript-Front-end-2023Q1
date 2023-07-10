import Api from '../../api';
import CarView from '../../components/car-view/car-view';
import { CarsType } from '../../types/types';
import './style.css';
import PaginationView from '../pagination/pagination';
import FormView from './form-view/form-view';

export default class GarageView {
    protected garageView: HTMLElement;
    private garage = document.createElement('div');

    private raceRoads = document.createElement('div');
    private roadHeader = document.createElement('h2');
    private pageNumberHeader = document.createElement('h3');
    private carsListElement = document.createElement('div');
    private carsListData!: CarsType;
    private allCars!: CarsType;
    private currentPageNumber = localStorage.getItem('currentPage');
    private api = new Api();
    private formView = new FormView();
    private carView!: CarView;
    private paginationView = new PaginationView();

    constructor() {
        this.getCars();
        this.getCarsByPage();
        this.garageView = this.createGarage();
    }

    getGarageView() {
        return this.garageView;
    }

    private async getCars() {
        this.allCars = await this.api.getCars();
        console.log(this.allCars);
        if (this.allCars) localStorage.setItem('totalCountCars', `${this.allCars.length}`);
    }

    private async getCarsByPage() {
        const currentPageNumber = localStorage.getItem('currentPage');
        currentPageNumber
            ? (this.carsListData = await this.api.getCarsByPage(+currentPageNumber))
            : (this.carsListData = await this.api.getCarsByPage(1));
        this.createRaceRoad();
        // console.log(currentPageNumber);
    }

    private createGarage() {
        this.garage.classList.add('garage');

        this.garage.append(this.formView.createForm(), this.raceRoads, this.paginationView.createButtons());
        return this.garage;
    }

    private createRaceRoad() {
        // console.log(this.carsListData);
        this.raceRoads.classList.add('race-road');
        this.allCars
            ? (this.roadHeader.innerText = `Garage (${this.allCars.length})`)
            : (this.roadHeader.innerText = `Garage (${0})`);
        this.pageNumberHeader.innerText = `Page #${this.currentPageNumber}`;
        this.carsListElement.classList.add('cars-list');

        this.carsListData.map((carData) => {
            this.carView = new CarView(carData);
            this.carView.createCarBlock(this.carsListElement);
        });
        this.raceRoads.append(this.roadHeader, this.pageNumberHeader, this.carsListElement);
    }
}
