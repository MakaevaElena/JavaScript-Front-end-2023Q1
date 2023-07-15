import './style.css';
import Api from '../../api';
import { CarType, winnerDataType } from '../../types/types';
import { carImage } from '../car-view/car-image';
import FormView from '../garage-view/form-view/form-view';
import GarageView from '../garage-view/garage-view';

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

    private carData: CarType;
    private api = new Api();
    private formView: FormView;
    private garageView: GarageView;

    constructor(carData: CarType, formView: FormView, garageView: GarageView) {
        this.garageView = garageView;
        this.formView = formView;
        this.carData = carData;
        this.createTop(this.carData);
        this.createBottom(this.carData);
        this.createCar(carData);
        this.updateCar(carData);
        this.deleteCar(carData);
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
        this.carBottom.classList.add('car-bottom');
        this.carBottomButtons.classList.add('car-bottom-buttons');
        this.startButton.classList.add('start-button', 'button');
        this.flag.classList.add('flag');
        this.startButton.innerHTML = `<h3>A</h3>`;

        this.stopButton.classList.add('stop-button', 'button');
        this.stopButton.innerHTML = `<h3>B</h3>`;

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
        document.addEventListener('animationend', () => {
            // this.car.classList.remove('drive-car');
            this.car.classList.remove('move-right');
        });
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
            this.api.deleteCar(carData.id);
            this.garageView.createRaceRoad();
        });
    }

    private startEngine(id: number) {
        this.api.startStopEngine(id, 'started').then((response) => {
            this.driveCar(id, response.distance / response.velocity);
        });
    }

    private stopEngine(id: number) {
        this.api.startStopEngine(id, 'stopped');
    }

    private driveCar(id: number, time: number) {
        console.log(time);
        // this.car.classList.add('drive-car');
        this.car.style.transitionDuration = `${time}`;
        this.car.classList.add('move-right');
        this.api
            .driveCar(id, 'drive')
            .then((response) => {
                if (response.success === true) {
                    console.log(`${id} add to winners`);

                    this.api
                        .getWinner(id)
                        .then((winner: winnerDataType) => this.api.updateWinner(id, { wins: winner.wins, time: time }))
                        .catch(() => this.api.createWinner({ id: id, wins: 1, time: time }));
                }
            })
            .catch((error) => {
                console.log(error);
                switch (error) {
                    case 500:
                        console.log('500 stop car');
                        break;
                    case 400:
                        console.log('error 400');
                        break;
                    case 404:
                        console.log('error 404');
                        break;
                    case 429:
                        console.log('error 429');
                        break;
                    default:
                        console.log('default');
                }
            });
    }
}
