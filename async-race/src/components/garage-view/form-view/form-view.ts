import Api from '../../../api';
// import CarView from '../../components/car-view/car-view';
// import { CarsType } from '../../types/types';
import './style.css';

import { MODELS } from './constants';

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

    private api = new Api();

    constructor() {
        this.createForm();
        this.sendFormData();
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
        const createCar = () => {
            const name = this.inputCreateName.value || 'Car';
            const color = this.buttonCreateColor.value;
            this.api.createCar({ name: name, color: color });
        };

        const createHundredCars = () => {
            for (let i = 0; i < 100; i++) {
                const randomName = MODELS[this.getRandomInt(MODELS.length)];
                const randomColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
                this.api.createCar({ name: randomName, color: randomColor });
            }
        };

        const updateCar = () => {
            const id = localStorage.getItem('id');
            let name = localStorage.getItem('name');
            if (name) this.inputUpdateName.innerText = name;
            this.inputUpdateName.addEventListener('change', () => (name = this.inputUpdateName.value));

            const newColor = this.buttonUpdateColor.value;
            if (id && name) this.api.updateCar(+id, { name: name, color: newColor });
        };

        this.buttonCreate.addEventListener('click', createCar);
        this.buttonUpdate.addEventListener('click', updateCar);
        this.buttonGenerateCars.addEventListener('click', createHundredCars);
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
}
