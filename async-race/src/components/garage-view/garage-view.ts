import Api from '../../api';
import CarView from '../../components/car-view/car-view';
import { CarsType } from '../../types/types';
import './style.css';
import PaginationView from '../pagination/pagination';
import FormView from './form-view/form-view';
import DefaultView from '../main-view/default-view';

export default class GarageView extends DefaultView {
    private START_PAGE = '1';
    protected garageView: HTMLElement;
    private garage = document.createElement('div');

    private raceRoads = document.createElement('div');
    private roadHeader = document.createElement('h2');
    private pageNumberHeader = document.createElement('h3');
    private carsListElement = document.createElement('div');
    private currentPageNumber = localStorage.getItem('currentPage');
    private api = new Api();
    private carView!: CarView;
    private paginationView = new PaginationView(this);
    private formView = new FormView(this, this.paginationView);
    private allCars = new Array(4);

    constructor() {
        super();
        this.garageView = this.createGarage();
    }

    getGarageView() {
        return this.garageView;
    }

    private createGarage() {
        // if (this.garageView) this.garageView.innerHTML = '';
        // this.garage.innerHTML = '';

        this.garage.classList.add('garage');
        const isGarage = localStorage.getItem('isGarage');

        //TODO ? почему не сработало this.hideGarage()
        // isGarage === 'true' ? this.showGarage() : this.hideGarage();
        if (isGarage === 'true') {
            this.garage.classList.add('show');
            this.garage.classList.remove('hide');
        } else {
            this.garage.classList.remove('show');
            this.garage.classList.add('hide');
        }

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
            .then((garage) => garage)
            .catch(() => alert('Server Error - failed to get cars'));

        return this.garage;
    }

    public async createRaceRoad() {
        this.carsListElement.innerHTML = '';
        if (this.allCars.length <= 7) {
            // localStorage.setItem('currentPage', this.START_PAGE);
            this.pageNumberHeader.innerText = `Page #${this.currentPageNumber}`;
        }

        this.api.getCars().then((allCars) => {
            this.allCars = allCars;
            this.paginationView.createButtons(`${this.allCars.length}`);
        });

        this.currentPageNumber = localStorage.getItem('currentPage') || this.START_PAGE;
        this.api.getCars().then((totalCountCars) => {
            this.roadHeader.innerText = `Garage (${totalCountCars.length})`;
        });
        this.raceRoads.classList.add('race-road');
        this.pageNumberHeader.innerText = `Page #${this.currentPageNumber}`;
        this.carsListElement.classList.add('cars-list');

        this.raceRoads.append(this.roadHeader, this.pageNumberHeader, this.carsListElement);

        const carsListData: CarsType = await this.api.getCarsByPage(+this.currentPageNumber);

        carsListData.map((carData) => {
            this.carView = new CarView(carData, this.formView, this);
            this.carView.createCarBlock(this.carsListElement);
        });
    }

    public showGarage() {
        this.garageView.classList.add('show');
        this.garageView.classList.remove('hide');
        localStorage.setItem('isGarage', 'true');
    }

    public hideGarage() {
        this.garageView.classList.remove('show');
        this.garageView.classList.add('hide');
        localStorage.setItem('isGarage', 'false');
    }
}
