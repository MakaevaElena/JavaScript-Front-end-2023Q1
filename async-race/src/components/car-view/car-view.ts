import './style.css';
import Api from '../../api';
import { CarType } from '../../types/types';
import { CAR_IMAGE } from '../car-view/car-image';
import FormView from '../garage-view/form-view/form-view';
import GarageView from '../garage-view/garage-view';
import Observer from '../app/observer/observer';
import { EventName } from '../../enums/events/events-names';
import DefaultView from '../main-view/default-view';
import { TagNames } from '../../enums/views/tag-names';
import { CarViewCssClasses, CommonCssClasses } from '../../enums/views/css-classes';

export default class CarView extends DefaultView {
    private selectButton = this.createTagElement(
        TagNames.BUTTON,
        [CarViewCssClasses.SELECT_BUTTON, CommonCssClasses.BUTTON],
        `<h3>select</h3>`
    );
    private removeButton = this.createTagElement(
        TagNames.BUTTON,
        [CarViewCssClasses.REMOVE_BUTTON, CommonCssClasses.BUTTON],
        `<h3>remove</h3>`
    );

    private carTop = this.createTagElement(TagNames.BLOCK, [CarViewCssClasses.CAR_TOP]);
    private carBottom = this.createTagElement(TagNames.BLOCK, [CarViewCssClasses.CAR_BOTTOM]);
    private startButton = this.createTagElement(
        TagNames.BUTTON,
        [CarViewCssClasses.START_BUTTON, CommonCssClasses.BUTTON],
        `<h3>A</h3>`
    );
    private stopButton = this.createTagElement(
        TagNames.BUTTON,
        [CarViewCssClasses.STOP_BUTTON, CommonCssClasses.BUTTON, CommonCssClasses.DISABLED_BUTTON],
        `<h3>B</h3>`
    );
    private carBottomButtons = this.createTagElement(TagNames.BLOCK, [CarViewCssClasses.CAR_BOTTOM_BUTTONS]);

    private car = this.createTagElement(TagNames.BLOCK, [CarViewCssClasses.CAR], CAR_IMAGE);
    private myReq!: number;

    public carData: CarType;
    private api = new Api();
    private formView: FormView;
    private garageView: GarageView;
    private observer: Observer;

    constructor(carData: CarType, formView: FormView, garageView: GarageView, observer: Observer) {
        super();
        this.observer = observer;
        this.garageView = garageView;
        this.formView = formView;
        this.carData = carData;
        this.createTop(this.carData);
        this.createBottom(this.carData);
        this.createCar(carData);
        this.updateCar(carData);
        this.deleteCar(carData);
        observer?.subscribe(EventName.RESET, this.stopEngine.bind(this));
    }

    public createCarBlock(carsListElement: HTMLDivElement) {
        const carBlock = this.createTagElement(TagNames.BLOCK, [CarViewCssClasses.CAR_BLOCK]);
        carBlock.append(this.carTop, this.carBottom);
        carsListElement.append(carBlock);
    }

    private createTop(carData: CarType) {
        const carName = this.createTagElement(TagNames.BLOCK, [CarViewCssClasses.CAR_NAME], `<h3>${carData.name}</h3>`);
        this.carTop.append(this.selectButton, this.removeButton, carName);
    }

    private createBottom(carData: CarType) {
        const flag = this.createTagElement(TagNames.BLOCK, [CarViewCssClasses.FLAG]);

        this.stopButton.disabled = true;

        this.startButton.addEventListener('click', () => this.startEngine(carData.id));
        this.stopButton.addEventListener('click', () => this.stopEngine(carData.id));

        this.carBottomButtons.append(this.startButton, this.stopButton);
        this.carBottom.append(this.carBottomButtons, flag);
    }

    private createCar(carData: CarType) {
        const carSVGElement = this.car.querySelector(CarViewCssClasses.SVG);
        if (carSVGElement) carSVGElement.setAttribute('fill', `${carData.color}`);
        this.carBottom.append(this.car);
    }

    private updateCar(carData: CarType) {
        this.selectButton.addEventListener('click', () => {
            localStorage.setItem('id', carData.id.toString());
            localStorage.setItem('name', carData.name);
            this.formView.setItemName(carData.name);
        });
    }

    private deleteCar(carData: CarType) {
        this.removeButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.api.deleteCar(carData.id).then(() => {
                this.garageView.createRaceRoad();
                this.api.deleteWinner(carData.id).then(() => this.api.deleteWinner(carData.id));
            });
        });
    }

    public startEngine<T>(id: T) {
        let currentId: number;
        id ? (currentId = +id) : (currentId = this.carData.id);
        this.startButton.disabled = true;
        this.startButton.classList.add(CommonCssClasses.DISABLED_BUTTON);
        this.stopButton.disabled = false;
        this.stopButton.classList.remove(CommonCssClasses.DISABLED_BUTTON);

        this.api.startStopEngine(+currentId, 'started').then((response) => {
            this.driveCar(+currentId, response.distance / response.velocity);
        });
    }

    public stopEngine<T>(id: T) {
        let currentId;
        id ? (currentId = +id) : (currentId = this.carData.id);
        this.stopButton.disabled = true;
        this.stopButton.classList.add(CommonCssClasses.DISABLED_BUTTON);
        this.api.startStopEngine(+currentId, 'stopped').then(() => {
            cancelAnimationFrame(this.myReq);
            this.car.style.transform = `translateX(${0}vw)`;
            this.startButton.disabled = false;
            this.startButton.classList.remove(CommonCssClasses.DISABLED_BUTTON);
        });
    }

    private animateCar(end: number, duration: number) {
        const width = window.screen.width;
        const endX = end * (width / 100);

        let currentX = this.car.offsetLeft;
        const frameCount = (duration / 1000) * 60;
        const dX = (endX - this.car.offsetLeft) / frameCount;

        const tick = () => {
            currentX += dX;
            this.car.style.transform = `translate(${currentX}px)`;
            if (currentX < endX) {
                this.myReq = requestAnimationFrame(tick);
            }
        };
        tick();
    }

    private async driveCar(id: number, time: number) {
        const mediaQuery = window.matchMedia('(max-width: 700px)');
        if (mediaQuery.matches) {
            this.animateCar(60, time);
        } else {
            this.animateCar(82, time);
        }

        await this.api
            .driveCar(id, 'drive')
            .then((response) => {
                switch (true) {
                    case response.success === true: {
                        this.observer.notify(EventName.FINISH, id);
                        const absoluteWinnerId = this.formView.getAbsoluteWinner();

                        this.api.getWinner(absoluteWinnerId).then((res) => {
                            switch (true) {
                                case res instanceof Object:
                                    this.api.updateWinner(id, { wins: res.wins + 1, time: res.time });
                                    break;
                                case res === 404:
                                    this.api.createWinner({ id: id, wins: 1, time: time });
                                    break;
                                default:
                                    console.log('getWinner default error');
                            }
                        });

                        break;
                    }

                    case response === 500:
                        console.log('error 500');
                        cancelAnimationFrame(this.myReq);

                        break;
                    case response === 400:
                        console.log('error 400');
                        break;
                    case response === 404:
                        console.log('error 404');
                        break;
                    case response === 429:
                        console.log('error 429');
                        break;
                    default:
                        console.log('driveCar default error');
                }
            })
            .finally(() => {
                this.startButton.disabled = false;
                this.startButton.classList.remove(CommonCssClasses.DISABLED_BUTTON);
                this.observer.notify(EventName.ARRAIVED);
            });
    }
}
