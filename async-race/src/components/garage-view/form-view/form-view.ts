import Api from '../../../api';
import GarageView from '../../garage-view/garage-view';
import PaginationView from '../../pagination/pagination';
import CarView from '../../../components/car-view/car-view';
import './style.css';
import { CarsType } from '../../../types/types';
import { MODELS } from './constants';
import Observer from '../../app/observer/observer';
import { EventName } from '../../../enums/events/events-names';

export default class FormView {
    private form = document.createElement('form');
    private inputCreateName = document.createElement('input');
    private inputUpdateName = document.createElement('input');
    private buttonCreateColor = document.createElement('input');
    private buttonUpdateColor = document.createElement('input');
    private buttonCreate = document.createElement('button');
    private buttonUpdate = document.createElement('button');
    private buttonRace = document.createElement('button');
    private buttonReset = document.createElement('button');
    private buttonGenerateCars = document.createElement('button');
    private currentPageNumber = localStorage.getItem('currentPage') || '1';

    private api = new Api();
    private garageView: GarageView;
    private paginationView: PaginationView;
    private carView: CarView;
    private observer: Observer;

    constructor(garageView: GarageView, paginationView: PaginationView, carView: CarView, observer: Observer) {
        this.observer = observer;
        this.paginationView = paginationView;
        this.garageView = garageView;
        this.carView = carView;
        this.createForm();
        this.sendFormData();
        this.resetRace();
        this.startRace();
    }

    public createForm() {
        this.form.classList.add('form');
        this.inputCreateName.classList.add('create-name');
        this.buttonCreateColor.classList.add('create-color');
        this.buttonCreate.classList.add('button-create', 'button');
        this.inputUpdateName.classList.add('update-name');
        this.buttonUpdateColor.classList.add('update-color');
        this.buttonUpdate.classList.add('button-update', 'button');
        this.buttonRace.classList.add('button-race', 'button');
        this.buttonReset.classList.add('button-reset', 'button');
        this.buttonGenerateCars.classList.add('generate-cars', 'button');

        this.buttonCreateColor.setAttribute('type', 'color');
        this.buttonUpdateColor.setAttribute('type', 'color');
        this.buttonCreateColor.setAttribute('value', '#0000ff');
        this.buttonUpdateColor.setAttribute('value', '#0000ff');

        this.buttonCreate.innerHTML = `CREATE`;
        this.buttonUpdate.innerHTML = `UPDATE`;
        this.buttonRace.innerHTML = `RACE`;
        this.buttonReset.innerHTML = `RESET`;
        this.buttonGenerateCars.innerHTML = `GENERATE CAR`;

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
        return this.form;
    }

    private sendFormData() {
        const createCar = (event: Event) => {
            event.preventDefault();
            const name = this.inputCreateName.value || 'Car';
            const color = this.buttonCreateColor.value;
            this.api.createCar({ name: name, color: color });
            this.garageView.createRaceRoad();
        };

        const createHundredCars = (event: Event) => {
            event.preventDefault();
            for (let i = 0; i < 100; i++) {
                const randomName = MODELS[this.getRandomInt(MODELS.length)];
                const randomColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
                this.api.createCar({ name: randomName, color: randomColor });
            }
            this.garageView.createRaceRoad();
        };

        const updateCar = (event: Event) => {
            event.preventDefault();
            const id = localStorage.getItem('id');
            const newName = this.inputUpdateName.value;
            const newColor = this.buttonUpdateColor.value;
            if (id && newName) this.api.updateCar(+id, { name: newName, color: newColor });
            this.garageView.createRaceRoad();
        };

        this.buttonCreate.addEventListener('click', createCar);
        this.buttonUpdate.addEventListener('click', updateCar);
        this.buttonGenerateCars.addEventListener('click', createHundredCars);
    }

    private startRace() {
        this.buttonRace.addEventListener('click', this.raceHandler);
    }

    private raceHandler = (event: Event) => {
        event.preventDefault();
        this.api.getAllCars().then((allCars: CarsType) => {
            allCars.forEach((carData) => {
                // this.carView.startEngine(carData.id);
                this.observer.notify(EventName.RACE, carData.id);
            });
        });
    };

    private resetRace() {
        this.buttonReset.addEventListener('click', this.resetHandler);
    }

    private resetHandler = (event: Event) => {
        event.preventDefault();
        // console.log(this);

        this.api.getCarsByPage(+this.currentPageNumber).then((allCars: CarsType) => {
            allCars.forEach((carData) => {
                // console.log(this.carView);
                this.observer.notify(EventName.RESET, carData.id);

                // this.carView.stopEngine(carData.id);
            });
        });
    };

    public setItemName(name: string) {
        this.inputUpdateName.value = name;
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
}
