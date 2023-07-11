import './style.css';
import Api from '../../api';
import { CarType } from '../../types/types';
import { carImage } from '../car-view/car-image';

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

    constructor(carData: CarType) {
        this.carData = carData;
        this.createTop(this.carData);
        this.createBottom();
        this.createCar(carData);
        this.updateCar(carData);
        this.deleteCar(carData);
        this.driveCar();
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

    private createBottom() {
        this.carBottom.classList.add('car-bottom');
        this.carBottomButtons.classList.add('car-bottom-buttons');
        this.startButton.classList.add('start-button', 'button');
        this.flag.classList.add('flag');
        this.startButton.innerHTML = `<h3>A</h3>`;
        this.stopButton.classList.add('stop-button', 'button');
        this.stopButton.innerHTML = `<h3>B</h3>`;
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
            // this.car.style.left = '800px';
        });
    }

    private updateCar(carData: CarType) {
        this.selectButton.addEventListener('click', () => {
            localStorage.setItem('id', carData.id.toString());
            localStorage.setItem('name', carData.name);
        });
    }

    private deleteCar(carData: CarType) {
        this.removeButton.addEventListener('click', () => {
            this.api.deleteCar(carData.id);
            window.document.location.reload();
        });
    }

    private driveCar() {
        this.startButton.addEventListener('click', () => {
            // this.car.classList.add('drive-car');
            this.car.classList.add('move-right');
        });
    }
}
