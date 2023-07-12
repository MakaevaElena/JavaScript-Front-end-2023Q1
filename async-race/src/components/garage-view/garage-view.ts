import Api from '../../api';
import CarView from '../../components/car-view/car-view';
import { CarsType } from '../../types/types';
import './style.css';
import PaginationView from '../pagination/pagination';
import FormView from './form-view/form-view';
import MainView from '../main-view/main-view';

export default class GarageView extends MainView {
    protected garageView: HTMLElement;
    private garage = document.createElement('div');

    private raceRoads = document.createElement('div');
    private roadHeader = document.createElement('h2');
    private pageNumberHeader = document.createElement('h3');
    private carsListElement = document.createElement('div');
    private carsListData!: CarsType;
    private allCars!: CarsType;
    private totalCountCars = localStorage.getItem('totalCountCars');
    private currentPageNumber = localStorage.getItem('currentPage');
    private api = new Api();
    private formView = new FormView();
    private carView!: CarView;
    private paginationView = new PaginationView();

    constructor() {
        super();
        this.garageView = this.createGarage();
    }

    getGarageView() {
        return this.garageView;
    }

    private async getCars() {
        this.allCars = await this.api.getCars();
        if (this.allCars) localStorage.setItem('totalCountCars', `${this.allCars.length}`);
    }

    private async getCarsByPage() {
        this.currentPageNumber = localStorage.getItem('currentPage') || '1';
        this.carsListData = await this.api.getCarsByPage(+this.currentPageNumber);
        this.createRaceRoad();
    }

    private createGarage() {
        this.garage.classList.add('garage');
        this.getCars();
        this.getCarsByPage();
        //TODO данные в LocalStorage не успевают записаться, кнопки пагинации не отображаются
        this.totalCountCars = localStorage.getItem('totalCountCars') || '4';
        this.garage.append(
            this.formView.createForm(),
            this.raceRoads,
            this.paginationView.createButtons(this.totalCountCars)
        );
        return this.garage;
    }

    private createRaceRoad() {
        this.currentPageNumber = localStorage.getItem('currentPage');
        this.totalCountCars = localStorage.getItem('totalCountCars');
        this.raceRoads.classList.add('race-road');
        this.totalCountCars
            ? (this.roadHeader.innerText = `Garage (${this.totalCountCars})`)
            : (this.roadHeader.innerText = `Garage (${4})`);
        this.currentPageNumber
            ? (this.pageNumberHeader.innerText = `Page #${this.currentPageNumber}`)
            : (this.pageNumberHeader.innerText = `Page #${1}`);
        this.carsListElement.classList.add('cars-list');

        if (this.carsListData)
            this.carsListData.map((carData) => {
                this.carView = new CarView(carData);
                this.carView.createCarBlock(this.carsListElement);
            });
        this.raceRoads.append(this.roadHeader, this.pageNumberHeader, this.carsListElement);
    }

    public showGarage() {
        console.log(this.garage);
        this.garage.classList.add('show');
        this.garage.classList.remove('hide');
    }

    public hideGarage() {
        console.log(this.garage);
        this.garage.classList.remove('show');
        this.garage.classList.add('hide');
    }
}
