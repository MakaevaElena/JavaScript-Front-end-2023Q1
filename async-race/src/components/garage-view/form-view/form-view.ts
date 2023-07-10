// import Api from '../../api';
// import CarView from '../../components/car-view/car-view';
// import { CarsType } from '../../types/types';
import './style.css';

export default class FormView {
    private form = document.createElement('form');
    private inputCreateName = document.createElement('input');
    private inputUpdateName = document.createElement('input');
    private buttonCreateColor = document.createElement('button');
    private buttonUpdateColor = document.createElement('button');
    private buttonCreate = document.createElement('button');
    private buttonUpdate = document.createElement('button');
    private buttonRace = document.createElement('button');
    private buttonReset = document.createElement('button');
    private buttonGenerateCars = document.createElement('button');

    constructor() {
        this.createForm();
    }

    public createForm() {
        this.form.classList.add('form');
        this.inputCreateName.classList.add('create-name');
        this.buttonCreateColor.classList.add('create-color', 'button');
        this.buttonCreate.classList.add('button-create', 'button');
        this.inputUpdateName.classList.add('update-name');
        this.buttonUpdateColor.classList.add('update-color', 'button');
        this.buttonUpdate.classList.add('button-update', 'button');
        this.buttonRace.classList.add('button-race', 'button');
        this.buttonReset.classList.add('button-reset', 'button');
        this.buttonGenerateCars.classList.add('generate-cars', 'button');

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
}
