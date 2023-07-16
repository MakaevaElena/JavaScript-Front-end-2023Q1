import { winnerDataType, CarType } from './../../types/types';
import './style.css';
import { carImage } from '../car-view/car-image';
import Api from '../../api';
import DefaultView from '../main-view/default-view';

export default class WinnersView extends DefaultView {
    private api = new Api();
    protected winnersView: HTMLElement;
    private winners = document.createElement('div');

    constructor() {
        super();
        this.winnersView = this.createWinnersPage();
    }

    getWinnersView() {
        return this.winnersView;
    }

    private createWinnersPage() {
        this.winners.classList.add('winners', 'hide');

        const isGarage = localStorage.getItem('isGarage');
        isGarage === 'true' ? this.hideWinners() : this.showWinners();

        this.winners.innerHTML = 'WINNERS';
        this.winners.append(this.createWinnersTable());
        return this.winners;
    }

    private createWinnersTable() {
        const table = document.createElement('div');
        table.classList.add('winners-table');

        this.createTableHeaders(table);

        this.api.getWinners(1).then((winners) => {
            console.log(winners);

            winners.map((winner: winnerDataType, i: number) => {
                const winnerRow = this.createTagElement('div', ['winner-row', 'cell']);
                const winnerNum = this.createTagElement('div', ['winner-Num', 'cell'], `${i}`);
                const winnerWins = this.createTagElement('div', ['winner-wins', 'cell'], `${winner.wins}`);
                const winnerTime = this.createTagElement('div', ['winner-time', 'cell'], `${Math.round(winner.time)}`);

                this.api.getCar(winner.id).then((carData: CarType) => {
                    const winnerCar = this.createTagElement('div', ['winner-car', 'cell']);
                    winnerCar.innerHTML = carImage;
                    const carSVGElement = winnerCar.querySelector('svg g');
                    if (carSVGElement) carSVGElement.setAttribute('fill', `${carData.color}`);

                    const winnerName = this.createTagElement('div', ['winner-name', 'cell'], `${carData.name}`);
                    winnerRow.append(winnerNum, winnerCar, winnerName, winnerWins, winnerTime);
                });

                table.append(winnerRow);
            });
        });

        return table;
    }
    private createTableHeaders(table: HTMLElement) {
        const tableHeader = this.createTagElement('div', ['winner-row', 'table-header']);
        const tableHeaderNum = this.createTagElement('div', ['table-header-number', 'cell'], 'Number');
        const tableHeaderCar = this.createTagElement('div', ['table-header-car', 'cell'], 'Car');
        const tableHeaderName = this.createTagElement('div', ['table-header-name', 'cell'], 'Name');
        const tableHeaderWins = this.createTagElement('div', ['table-header-wins', 'cell'], 'Wins');
        const tableHeaderTime = this.createTagElement('div', ['table-header-time', 'cell'], 'Best time');

        tableHeader.append(tableHeaderNum, tableHeaderCar, tableHeaderName, tableHeaderWins, tableHeaderTime);
        table.append(tableHeader);
    }

    public showWinners() {
        this.winners.classList.add('show');
        this.winners.classList.remove('hide');
        localStorage.setItem('isGarage', 'false');
    }

    public hideWinners() {
        this.winners.classList.remove('show');
        this.winners.classList.add('hide');
        localStorage.setItem('isGarage', 'true');
    }
}
