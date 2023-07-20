import Api from '../../../api';
import GarageView from '../../garage-view/garage-view';
import PaginationView from '../../pagination/pagination';
import './style.css';
import { MODELS, CAR_BODIES } from './constants';
import Observer from '../../app/observer/observer';
import { EventName } from '../../../enums/events/events-names';
import DefaultView from '../../main-view/default-view';
// import CarView from '../../../components/car-view/car-view';

export default class FormView extends DefaultView {
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
    private winnerPopup = this.createTagElement('div', ['winner-popup', 'grow']);

    private api = new Api();
    private garageView: GarageView;
    // private paginationView: PaginationView;
    private observer: Observer;
    private winnerIds: Array<number> = [];
    private countArrived = 0;

    constructor(garageView: GarageView, paginationView: PaginationView, observer: Observer) {
        super();
        this.observer = observer;
        // this.paginationView = paginationView;
        this.garageView = garageView;
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

        const createHundredCars = async (event: Event) => {
            event.preventDefault();

            this.buttonGenerateCars.disabled = true;
            this.buttonGenerateCars.classList.add('disabled-button');

            for (let i = 0; i < 100; i++) {
                const randomName = `${MODELS[this.getRandomInt(MODELS.length)]} ${
                    CAR_BODIES[this.getRandomInt(CAR_BODIES.length)]
                }`;
                const randomColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
                await this.api.createCar({ name: randomName, color: randomColor });
            }
            this.garageView.createRaceRoad();
            this.buttonGenerateCars.disabled = false;
            this.buttonGenerateCars.classList.remove('disabled-button');
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
        this.winnerIds = [];
        event.preventDefault();
        this.observer.notify(EventName.RACE);
        this.observer?.subscribe(EventName.FINISH, this.setWinner.bind(this));
        this.observer?.subscribe(EventName.ARRAIVED, this.unBlockRaceButton.bind(this));

        this.buttonRace.disabled = true;
        this.buttonRace.classList.add('disabled-button');
    };

    private unBlockRaceButton = async () => {
        this.countArrived += 1;
        console.log(this.countArrived);
        const countOnPage = (await this.api.getCarsByPage(+this.currentPageNumber)).length;
        if (this.countArrived >= countOnPage) {
            this.buttonRace.disabled = false;
            this.buttonRace.classList.remove('disabled-button');
            this.observer?.unsubscribe(EventName.ARRAIVED);
            this.countArrived = 0;
        }
    };

    private resetRace() {
        this.buttonReset.addEventListener('click', this.resetHandler);
    }

    private resetHandler = (event: Event) => {
        this.winnerIds = [];
        this.countArrived = 0;
        event.preventDefault();

        this.observer.notify(EventName.RESET);
        if (document.body.contains(this.winnerPopup)) document.body.removeChild(this.winnerPopup);
        this.buttonRace.disabled = false;
        this.buttonRace.classList.remove('disabled-button');
    };

    public setItemName(name: string) {
        this.inputUpdateName.value = name;
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    private setWinner<T>(id: T) {
        this.winnerIds.push(+id);
        this.observer?.unsubscribe(EventName.FINISH);
        this.showWinnerPopup(this.winnerIds[0]);
    }

    private showWinnerPopup(id: number) {
        this.winnerPopup.innerHTML = '';
        this.api.getCar(id).then((winnerData) => {
            const message = this.createTagElement(
                'h2',
                ['winner-message'],
                `Congratulates!<br>${winnerData.name} WON!`
            );
            this.winnerPopup.append(message);
            document.body.append(this.winnerPopup);
        });
        document.body.addEventListener('click', () => {
            if (document.body.contains(this.winnerPopup)) document.body.removeChild(this.winnerPopup);
        });
    }

    public getAbsoluteWinner() {
        return this.winnerIds[0];
    }
}
