import GarageView from '../garage-view/garage-view';
import DefaultView from '../main-view/default-view';
import WinnersView from '../winners-view/winners-view';
import './style.css';
// import GarageView from '../garage-view/garage-view';

export default class HeaderView extends DefaultView {
    private headerView: HTMLElement;
    garageView: GarageView;
    winnersView: WinnersView;
    // private header = document.createElement('div');
    private headerButtons = document.createElement('div');
    private toGarageButton = document.createElement('button');
    private toWinnersButton = document.createElement('button');

    constructor(garageView: GarageView, winnersView: WinnersView) {
        super();
        this.headerView = this.createHeader();
        this.garageView = garageView;
        this.winnersView = winnersView;
    }

    getHeaderView() {
        return this.headerView;
    }

    private createHeader() {
        const header = document.createElement('header');
        header.classList.add('header');
        this.headerButtons.classList.add('header-buttons');
        this.toGarageButton.classList.add('to-garage', 'button');
        this.toGarageButton.innerHTML = `TO GARAGE`;
        this.toWinnersButton.classList.add('to-winners', 'button');
        this.toWinnersButton.innerHTML = `TO WINNERS`;
        this.headerButtons.append(this.toGarageButton, this.toWinnersButton);

        header.append(this.headerButtons);
        // this.changePage();
        this.showGarage();
        this.shawWinners();
        return header;
    }

    private showGarage() {
        this.toGarageButton.addEventListener('click', () => {
            this.garageView.showGarage();
            this.winnersView.hideWinners();
        });
    }

    private shawWinners() {
        this.toWinnersButton.addEventListener('click', () => {
            this.garageView.hideGarage();
            this.winnersView.showWinners();
        });
    }
}
