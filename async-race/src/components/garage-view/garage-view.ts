import Api from '../../api';
import CarView from '../../components/car-view/car-view';
import { CarsType } from '../../types/types';
import './style.css';
import PaginationView from '../pagination/pagination';
import FormView from './form-view/form-view';
import DefaultView from '../main-view/default-view';
import Observer from '../app/observer/observer';
import { EventName } from '../../enums/events/events-names';

export default class GarageView extends DefaultView {
    private START_PAGE = '1';
    protected garageView: HTMLElement;
    private garage = document.createElement('div');

    private raceRoads = document.createElement('div');
    private roadHeader = document.createElement('h2');
    private pageNumberHeader = document.createElement('h3');
    private carsListElement = document.createElement('div');
    // private currentPageNumber = localStorage.getItem('currentPage') || '1';
    private api = new Api();
    private carView!: CarView;
    private carViews: Array<CarView> = [];
    private paginationView = new PaginationView(this);
    private allCars = new Array(4);
    private observer: Observer;
    private formView: FormView;

    constructor(observer: Observer) {
        super();
        this.observer = observer;
        this.garageView = this.createGarage();
        this.formView = new FormView(this, this.paginationView, this.observer);

        observer?.subscribe(EventName.RACE, this.raceAllCars.bind(this));
    }

    getGarageView() {
        return this.garageView;
    }

    private createGarage() {
        this.garage.classList.add('garage');
        const isGarage = localStorage.getItem('isGarage');

        //почему не сработало this.hideGarage()
        if (isGarage === 'true' || !isGarage) {
            this.garage.classList.add('show');
            this.garage.classList.remove('hide');
        }
        if (isGarage === 'false') {
            this.garage.classList.remove('show');
            this.garage.classList.add('hide');
        }

        this.api
            .getAllCars()
            .then((allCars) => {
                this.garage.append(
                    this.formView.createForm(),
                    this.raceRoads,
                    this.paginationView.createButtons(`${allCars.length}`, null)
                );
                this.createRaceRoad();
                return this.garage;
            })
            .then((garage) => garage)
            .catch(() => alert('Server Error - failed to get cars'));

        return this.garage;
    }

    public async createRaceRoad(): Promise<void> {
        this.carViews = [];
        // console.log(this.carViews);
        const currentPageNumber = localStorage.getItem('currentPage') || '1';
        this.carsListElement.innerHTML = '';
        if (this.allCars.length <= 7) {
            this.pageNumberHeader.innerText = `Page #${currentPageNumber}`;
        }

        this.api.getAllCars().then((allCars) => {
            this.allCars = allCars;
            this.paginationView.createButtons(`${this.allCars.length}`, null);
            this.roadHeader.innerText = `Garage (${allCars.length})`;
        });

        this.raceRoads.classList.add('race-road');
        this.pageNumberHeader.innerText = `Page #${currentPageNumber}`;
        this.carsListElement.classList.add('cars-list');

        this.raceRoads.append(this.roadHeader, this.pageNumberHeader, this.carsListElement);

        const carsListData: CarsType = await this.api.getCarsByPage(+currentPageNumber);

        carsListData.map((carData) => {
            this.carView = new CarView(carData, this.formView, this, this.observer);
            // console.log(this.carView.carData.id);
            this.carViews.push(this.carView);
            // console.log(this.carViews);

            // this.carView.createCarBlock(this.carsListElement);
        });

        this.carViews.map((carView) => carView.createCarBlock(this.carsListElement));
    }

    public showGarage() {
        this.garageView.classList.add('show');
        this.garageView.classList.remove('hide');
    }

    public hideGarage() {
        this.garageView.classList.remove('show');
        this.garageView.classList.add('hide');
    }

    public raceAllCars() {
        const promise = this.carViews.map((carView) => carView.startEngine(carView.carData.id));
        Promise.all(promise);
        // const responses = Promise.all(promise);
        // console.log(responses);
    }
}
