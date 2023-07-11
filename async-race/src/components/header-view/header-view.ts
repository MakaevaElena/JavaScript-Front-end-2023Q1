import MainView from '../main-view/main-view';
import './style.css';
import GarageView from '../garage-view/garage-view';

export default class HeaderView extends MainView {
    private headerView: HTMLElement;
    // private header = document.createElement('div');
    private headerButtons = document.createElement('div');
    private toGarageButton = document.createElement('button');
    private toWinnersButton = document.createElement('button');
    private garageView = new GarageView();

    constructor() {
        super();
        this.headerView = this.createHeader();
    }

    getHeaderView() {
        return this.headerView;
    }

    private createHeader() {
        const header = document.createElement('div');
        header.classList.add('header');
        this.headerButtons.classList.add('header-buttons');
        this.toGarageButton.classList.add('to-garage', 'button');
        this.toGarageButton.innerHTML = `TO GARAGE`;
        this.toWinnersButton.classList.add('to-winners', 'button');
        this.toWinnersButton.innerHTML = `TO WINNERS`;
        this.headerButtons.append(this.toGarageButton, this.toWinnersButton);

        header.append(this.headerButtons);
        this.changePage();
        return header;
    }

    // TODO в инспекторе не добавляется класс hide/show к элементу garage
    private changePage() {
        this.toGarageButton.addEventListener('click', () => this.garageView.showGarage());
        this.toWinnersButton.addEventListener('click', () => this.garageView.hideGarage());
    }
}
