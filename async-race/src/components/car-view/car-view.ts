import './style.css';
import Api from '../../api';
import { CarType } from '../../types/types';
import { carImage } from '../car-view/car-image';
import FormView from '../garage-view/form-view/form-view';
import GarageView from '../garage-view/garage-view';
import Observer from '../app/observer/observer';
import { EventName } from '../../enums/events/events-names';

export default class CarView {
    private carBlock = document.createElement('div');
    private selectButton = document.createElement('button');
    private removeButton = document.createElement('button');
    private carName = document.createElement('div');
    private carTop = document.createElement('div');
    private carBottom = document.createElement('div');
    private startButton = document.createElement('button');
    private stopButton = document.createElement('button');
    private carBottomButtons = document.createElement('div');
    private flag = document.createElement('div');
    private car = document.createElement('div');
    private myReq!: number;

    public carData: CarType;
    private api = new Api();
    private formView: FormView;
    private garageView: GarageView;
    private observer: Observer;

    constructor(carData: CarType, formView: FormView, garageView: GarageView, observer: Observer) {
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
        observer?.subscribe(EventName.RACE, this.startEngine.bind(this));
    }

    public createCarBlock(carsListElement: HTMLDivElement) {
        this.carBlock = document.createElement('div');
        this.carBlock.classList.add('car-block');
        this.carBlock.append(this.carTop, this.carBottom);
        carsListElement.append(this.carBlock);
    }

    private createTop(carData: CarType) {
        this.carTop.classList.add('car-top');
        this.selectButton.classList.add('select-button', 'button');
        this.removeButton.classList.add('remove-button', 'button');
        this.carName.classList.add('car-name');
        this.carName.innerHTML = `<h3>${carData.name}</h3>`;
        this.selectButton.innerHTML = `<h3>select</h3>`;
        this.removeButton.innerHTML = `<h3>remove</h3>`;
        this.carTop.append(this.selectButton, this.removeButton, this.carName);
    }

    private createBottom(carData: CarType) {
        // this.carBottom.innerHTML = '';
        this.carBottom.classList.add('car-bottom');
        this.carBottomButtons.classList.add('car-bottom-buttons');
        this.startButton.classList.add('start-button', 'button');
        this.flag.classList.add('flag');
        this.startButton.innerHTML = `<h3>A</h3>`;

        this.stopButton.classList.add('stop-button', 'button', 'disabled-button');
        this.stopButton.innerHTML = `<h3>B</h3>`;
        this.stopButton.disabled = true;
        this.startButton.addEventListener('click', () => this.startEngine(carData.id));
        this.stopButton.addEventListener('click', () => this.stopEngine(carData.id));

        this.carBottomButtons.append(this.startButton, this.stopButton);
        this.carBottom.append(this.carBottomButtons, this.flag);
    }

    private createCar(carData: CarType) {
        this.car.classList.add('car');
        this.car.innerHTML = carImage;
        const carSVGElement = this.car.querySelector('svg g');
        if (carSVGElement) carSVGElement.setAttribute('fill', `${carData.color}`);
        this.carBottom.append(this.car);
        // document.addEventListener('animationend', () => {
        // });
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
        let currentId = 0;
        id ? (currentId = +id) : (currentId = this.carData.id);

        this.startButton.disabled = true;
        this.startButton.classList.add('disabled-button');
        this.stopButton.disabled = false;
        this.stopButton.classList.remove('disabled-button');

        this.api.startStopEngine(+currentId, 'started').then((response) => {
            this.driveCar(+currentId, response.distance / response.velocity);
        });
    }

    public stopEngine<T>(id: T) {
        let currentId;
        id ? (currentId = +id) : (currentId = this.carData.id);
        this.stopButton.disabled = true;
        this.stopButton.classList.add('disabled-button');
        this.api.startStopEngine(+currentId, 'stopped').then(() => {
            cancelAnimationFrame(this.myReq);
            this.car.style.transform = `translateX(${0}vw)`;
            // this.stopButton.disabled = false;
            // this.stopButton.classList.remove('disabled-button');
            this.startButton.disabled = false;
            this.startButton.classList.remove('disabled-button');
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
        this.animateCar(82, time);

        await this.api
            .driveCar(id, 'drive')
            .then((res) => {
                switch (true) {
                    case res.success === true: {
                        // TODO finish
                        this.observer.notify(EventName.FINISH, id);
                        const absoluteWinnerId = this.formView.getAbsoluteWinner();

                        this.api.getWinner(absoluteWinnerId).then((res) => {
                            switch (true) {
                                case res instanceof Object:
                                    this.api.updateWinner(id, { wins: res.wins + 1, time: time });
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

                    case res === 500:
                        console.log('error 500');
                        cancelAnimationFrame(this.myReq);

                        break;
                    case res === 400:
                        console.log('error 400');
                        break;
                    case res === 404:
                        console.log('error 404');
                        break;
                    case res === 429:
                        console.log('error 429');
                        break;
                    default:
                        console.log('driveCar default error');
                }
            })
            .finally(() => {
                this.startButton.disabled = false;
                this.startButton.classList.remove('disabled-button');
                this.observer.notify(EventName.ARRAIVED);
            });
    }
}
