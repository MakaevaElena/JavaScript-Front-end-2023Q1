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
    private currentPageNumber = localStorage.getItem('currentPage');
    private api = new Api();
    private formView = new FormView();
    private carView!: CarView;
    private paginationView = new PaginationView(this);

    constructor() {
        super();
        this.garageView = this.createGarage();
    }

    getGarageView() {
        return this.garageView;
    }

    public async setPage(currentPage: string) {
        console.log(currentPage);
        this.createGarage();
    }

    private createGarage() {
        // TODO почистить не получается
        if (this.garageView) this.garageView.innerHTML = '';
        this.garage.innerHTML = '';

        this.garage.classList.add('garage');

        this.api
            .getCars()
            .then((allCars) => {
                this.garage.append(
                    this.formView.createForm(),
                    this.raceRoads,
                    this.paginationView.createButtons(`${allCars.length}`)
                );
                this.createRaceRoad();
                return this.garage;
            })
            .then((garage) => garage);

        return this.garage;
    }

    private async createRaceRoad() {
        this.currentPageNumber = localStorage.getItem('currentPage');
        this.api.getCars().then((totalCountCars) => {
            this.roadHeader.innerText = `Garage (${totalCountCars.length})`;
        });
        this.raceRoads.classList.add('race-road');
        this.currentPageNumber
            ? (this.pageNumberHeader.innerText = `Page #${this.currentPageNumber}`)
            : (this.pageNumberHeader.innerText = `Page #${1}`);
        this.carsListElement.classList.add('cars-list');

        const currentPage = localStorage.getItem('currentPage') || '1';
        const carsListData: CarsType = await this.api.getCarsByPage(+currentPage);
        carsListData.map((carData) => {
            this.carView = new CarView(carData, this.formView);
            this.carView.createCarBlock(this.carsListElement);
        });
        this.raceRoads.append(this.roadHeader, this.pageNumberHeader, this.carsListElement);
    }

    public showGarage() {
        console.log(this.garageView);
        this.garageView.classList.add('show');
        this.garageView.classList.remove('hide');
    }

    public hideGarage() {
        console.log(this.garageView);
        this.garageView.classList.remove('show');
        this.garageView.classList.add('hide');
    }
}
