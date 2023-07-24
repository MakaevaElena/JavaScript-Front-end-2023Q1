import Api from '../../../api';
import GarageView from '../../garage-view/garage-view';
import './style.css';
import { MODELS, CAR_BODIES, START_PAGE } from '../../../constants';
import Observer from '../../app/observer/observer';
import { EventName } from '../../../enums/events/events-names';
import DefaultView from '../../main-view/default-view';
import { TagNames } from '../../../enums/views/tag-names';
import { FormViewCssClasses, CommonCssClasses } from '../../../enums/views/css-classes';
import { Storage } from '../../../enums/storage-names';
import { Attributes } from '../../../enums/views/css-attributes';

const BUTTON_CREATE_INNER_HTML = `CREATE`;
const BUTTON_UPDATE_INNER_HTML = `UPDATE`;
const BUTTON_RACE_INNER_HTML = `RACE`;
const BUTTON_RESET_INNER_HTML = `RESET`;
const GENERATE_CARS_INNER_HTML = `GENERATE CARS`;
const GENERATE_CARS_INNER_HTML_LOADING = 'LOADING ...';
const DEFAULT_CAR_NAME = 'Car';
const BUTTON_CREATE_COLOR_ATTRIBUTE_TYPE = 'color';
const BUTTON_UPDATE_COLOR_ATTRIBUTE_TYPE = 'color';
const BUTTON_CREATE_COLOR_ATTRIBUTE_VALUE = '#0000ff';
const BUTTON_UPDATE_COLOR_ATTRIBUTE_VALUE = '#0000ff';

export default class FormView extends DefaultView {
    private form = this.createTagElement(TagNames.FORM, [FormViewCssClasses.FORM]);
    private inputCreateName = this.createTagElement(TagNames.INPUT, [FormViewCssClasses.CREATE_NAME]);
    private inputUpdateName = this.createTagElement(TagNames.INPUT, [FormViewCssClasses.UPDATE_NAME]);
    private buttonCreateColor = this.createTagElement(TagNames.INPUT, [FormViewCssClasses.CREATE_COLOR]);
    private buttonUpdateColor = this.createTagElement(TagNames.INPUT, [FormViewCssClasses.UPDATE_COLOR]);
    private buttonCreate = this.createTagElement(
        TagNames.BUTTON,
        [FormViewCssClasses.BUTTON_CREATE, CommonCssClasses.BUTTON],
        BUTTON_CREATE_INNER_HTML
    );
    private buttonUpdate = this.createTagElement(
        TagNames.BUTTON,
        [FormViewCssClasses.BUTTON_UPDATE, CommonCssClasses.BUTTON],
        BUTTON_UPDATE_INNER_HTML
    );
    private buttonRace = this.createTagElement(
        TagNames.BUTTON,
        [FormViewCssClasses.BUTTON_RACE, CommonCssClasses.BUTTON],
        BUTTON_RACE_INNER_HTML
    );
    private buttonReset = this.createTagElement(
        TagNames.BUTTON,
        [FormViewCssClasses.BUTTON_RESET, CommonCssClasses.BUTTON],
        BUTTON_RESET_INNER_HTML
    );
    private buttonGenerateCars = this.createTagElement(
        TagNames.BUTTON,
        [FormViewCssClasses.GENERATE_CARS, CommonCssClasses.BUTTON],
        GENERATE_CARS_INNER_HTML
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
        this.buttonCreateColor.setAttribute(Attributes.TYPE, BUTTON_CREATE_COLOR_ATTRIBUTE_TYPE);
        this.buttonUpdateColor.setAttribute(Attributes.TYPE, BUTTON_UPDATE_COLOR_ATTRIBUTE_TYPE);
        this.buttonCreateColor.setAttribute(Attributes.VALUE, BUTTON_CREATE_COLOR_ATTRIBUTE_VALUE);
        this.buttonUpdateColor.setAttribute(Attributes.VALUE, BUTTON_UPDATE_COLOR_ATTRIBUTE_VALUE);

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
            const name = this.inputCreateName.value || DEFAULT_CAR_NAME;
            const color = this.buttonCreateColor.value;
            this.api.createCar({ name: name, color: color });
            this.garageView.createRaceRoad();
        };

        const createHundredCars = async (event: Event) => {
            event.preventDefault();

            this.buttonGenerateCars.disabled = true;
            this.buttonGenerateCars.classList.add(CommonCssClasses.DISABLED_BUTTON);
            this.buttonGenerateCars.innerHTML = GENERATE_CARS_INNER_HTML_LOADING;

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
            this.buttonGenerateCars.innerHTML = GENERATE_CARS_INNER_HTML;
        };

        const updateCar = (event: Event) => {
            event.preventDefault();
            const id = localStorage.getItem(Storage.ID);
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
        const currentPageNumber = localStorage.getItem(Storage.CURRENT_PAGE) || START_PAGE;
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
