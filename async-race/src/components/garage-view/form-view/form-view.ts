import Api from '../../../api';
import GarageView from '../../garage-view/garage-view';
import './style.css';
import { MODELS, CAR_BODIES } from './constants';
import Observer from '../../app/observer/observer';
import { EventName } from '../../../enums/events/events-names';
import DefaultView from '../../main-view/default-view';
import { TagNames } from '../../../enums/views/tag-names';
import { FormViewCssClasses, CommonCssClasses } from '../../../enums/views/css-classes';

export default class FormView extends DefaultView {
    private form = this.createTagElement(TagNames.FORM, [FormViewCssClasses.FORM]);
    private inputCreateName = this.createTagElement(TagNames.INPUT, [FormViewCssClasses.CREATE_NAME]);
    private inputUpdateName = this.createTagElement(TagNames.INPUT, [FormViewCssClasses.UPDATE_NAME]);
    private buttonCreateColor = this.createTagElement(TagNames.INPUT, [FormViewCssClasses.CREATE_COLOR]);
    private buttonUpdateColor = this.createTagElement(TagNames.INPUT, [FormViewCssClasses.UPDATE_COLOR]);
    private buttonCreate = this.createTagElement(
        TagNames.BUTTON,
        [FormViewCssClasses.BUTTON_CREATE, CommonCssClasses.BUTTON],
        `CREATE`
    );
    private buttonUpdate = this.createTagElement(
        TagNames.BUTTON,
        [FormViewCssClasses.BUTTON_UPDATE, CommonCssClasses.BUTTON],
        `UPDATE`
    );
    private buttonRace = this.createTagElement(
        TagNames.BUTTON,
        [FormViewCssClasses.BUTTON_RACE, CommonCssClasses.BUTTON],
        `RACE`
    );
    private buttonReset = this.createTagElement(
        TagNames.BUTTON,
        [FormViewCssClasses.BUTTON_RESET, CommonCssClasses.BUTTON],
        `RESET`
    );
    private buttonGenerateCars = this.createTagElement(
        TagNames.BUTTON,
        [FormViewCssClasses.GENERATE_CARS, CommonCssClasses.BUTTON],
        `GENERATE CARS`
    );
    private winnerPopup = this.createTagElement(TagNames.BLOCK, [
        FormViewCssClasses.WINNER_POPUP,
        FormViewCssClasses.GROW,
    ]);

    private api = new Api();
    private garageView: GarageView;
    private observer: Observer;
    private winnerIds: Array<number> = [];
    private countArrived = 0;

    constructor(garageView: GarageView, observer: Observer) {
        super();
        this.observer = observer;
        this.garageView = garageView;
        this.createForm();
        this.sendFormData();
        this.resetRace();
        this.startRace();
    }

    public createForm() {
        this.buttonCreateColor.setAttribute('type', 'color');
        this.buttonUpdateColor.setAttribute('type', 'color');
        this.buttonCreateColor.setAttribute('value', '#0000ff');
        this.buttonUpdateColor.setAttribute('value', '#0000ff');

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
            this.buttonGenerateCars.classList.add(CommonCssClasses.DISABLED_BUTTON);
            this.buttonGenerateCars.innerHTML = 'LOADING ...';

            for (let i = 0; i < 100; i++) {
                const randomName = `${MODELS[this.getRandomInt(MODELS.length)]} ${
                    CAR_BODIES[this.getRandomInt(CAR_BODIES.length)]
                }`;
                const randomColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
                await this.api.createCar({ name: randomName, color: randomColor });
            }
            this.garageView.createRaceRoad();
            this.buttonGenerateCars.disabled = false;
            this.buttonGenerateCars.classList.remove(CommonCssClasses.DISABLED_BUTTON);
            this.buttonGenerateCars.innerHTML = 'GENERATE CARS';
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

        this.buttonRace.disabled = true;
        this.buttonRace.classList.add(CommonCssClasses.DISABLED_BUTTON);
    };

    public unBlockRaceButton = async () => {
        this.countArrived += 1;
        const currentPageNumber = localStorage.getItem('currentPage') || '1';
        const countOnPage = (await this.api.getCarsByPage(+currentPageNumber)).length;
        if (this.countArrived >= countOnPage) {
            this.buttonRace.disabled = false;
            this.buttonRace.classList.remove(CommonCssClasses.DISABLED_BUTTON);
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
        this.buttonRace.classList.remove(CommonCssClasses.DISABLED_BUTTON);
        this.unBlockRaceButton();
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
                TagNames.HEADER_SECOND,
                [FormViewCssClasses.WINNER_MESSAGE],
                `${winnerData.name} WON!`
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
