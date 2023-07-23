import Api from '../../api';
import CarView from '../../components/car-view/car-view';
import { CarsType } from '../../types/types';
import './style.css';
import PaginationView from '../pagination/pagination';
import FormView from './form-view/form-view';
import DefaultView from '../main-view/default-view';
import Observer from '../app/observer/observer';
import { EventName } from '../../enums/events/events-names';
import { TagNames } from '../../enums/views/tag-names';
import { GarageViewCssClasses, CommonCssClasses } from '../../enums/views/css-classes';

export default class GarageView extends DefaultView {
    private START_PAGE = '1';
    protected garageView: HTMLElement;
    private raceRoads = this.createTagElement('div', ['race-road']);
    private carsListElement = this.createTagElement('div', ['cars-list'], '');
    private pageNumberHeader = this.createTagElement('h3', []);
    private roadHeader = this.createTagElement('h2', []);
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
        this.formView = new FormView(this, this.observer);

        observer?.subscribe(EventName.RACE, this.raceAllCars.bind(this));
    }

    getGarageView() {
        return this.garageView;
    }

    private createGarage() {
        const garage = this.createTagElement(TagNames.BLOCK, [GarageViewCssClasses.GARAGE]);
        const isGarage = localStorage.getItem('isGarage');

        //?почему не сработало this.hideGarage()
        if (isGarage === 'true' || !isGarage) {
            garage.classList.add(CommonCssClasses.SHOW);
            garage.classList.remove(CommonCssClasses.HIDE);
        }
        if (isGarage === 'false') {
            garage.classList.remove(CommonCssClasses.SHOW);
            garage.classList.add(CommonCssClasses.HIDE);
        }

        this.api
            .getAllCars()
            .then((allCars) => {
                garage.append(
                    this.formView.createForm(),
                    this.raceRoads,
                    this.paginationView.createButtons(`${allCars.length}`, null, 7)
                );
                this.createRaceRoad();
                return garage;
            })
            .then((garage) => garage)
            .catch(() => alert('Server Error - failed to get cars'));

        return garage;
    }

    public async createRaceRoad(): Promise<void> {
        const currentPageNumber = localStorage.getItem('currentPage') || '1';

        this.carViews = [];
        this.carsListElement.innerHTML = '';

        if (this.allCars.length <= 7) {
            // pageNumberHeader.innerText = `Page #${currentPageNumber}`;
        }

        this.api.getAllCars().then((allCars) => {
            this.allCars = allCars;
            this.paginationView.createButtons(`${this.allCars.length}`, null, 7);
            this.roadHeader.innerText = `Garage (${allCars.length})`;
        });

        this.pageNumberHeader.innerText = `Page #${currentPageNumber}`;

        this.raceRoads.append(this.roadHeader, this.pageNumberHeader, this.carsListElement);

        const carsListData: CarsType = await this.api.getCarsByPage(+currentPageNumber);

        carsListData.map((carData) => {
            this.carView = new CarView(carData, this.formView, this, this.observer);
            this.carViews.push(this.carView);
        });

        this.carViews.map((carView) => carView.createCarBlock(this.carsListElement));
    }

    public showGarage() {
        this.garageView.classList.add(CommonCssClasses.SHOW);
        this.garageView.classList.remove(CommonCssClasses.HIDE);
    }

    public hideGarage() {
        this.garageView.classList.remove(CommonCssClasses.SHOW);
        this.garageView.classList.add(CommonCssClasses.HIDE);
    }

    public raceAllCars() {
        this.carViews.map((carView) => carView.startEngine(carView.carData.id));
        // const responses = Promise.all(promise);
        // console.log(responses);
    }
}
