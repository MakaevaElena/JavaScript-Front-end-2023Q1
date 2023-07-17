import { winnerDataType, CarType } from './../../types/types';
import './style.css';
import { carImage } from '../car-view/car-image';
import Api from '../../api';
import DefaultView from '../main-view/default-view';
import PaginationView from '../pagination/pagination';

export default class WinnersView extends DefaultView {
    private api = new Api();
    protected winnersView: HTMLElement;
    private winners = document.createElement('div');
    private table = document.createElement('div');
    paginationView: PaginationView;

    constructor(paginationView: PaginationView) {
        super();
        this.winnersView = this.createWinnersPage();
        this.paginationView = paginationView;
    }

    getWinnersView() {
        return this.winnersView;
    }

    private createWinnersPage() {
        this.winners.classList.add('winners', 'hide');

        const isGarage = localStorage.getItem('isGarage');
        // const currentWinnersPage = localStorage.getItem('currentWinnersPage') || '1';
        isGarage === 'true' ? this.hideWinners() : this.showWinners();

        this.winners.innerHTML = 'WINNERS';
        this.winners.append(this.createWinnersTable());

        return this.winners;
    }

    public createWinnersTable() {
        // const table = document.createElement('div');
        this.table.innerHTML = '';
        this.table.classList.add('winners-table');

        this.createTableHeaders(this.table);
        const currentWinnersPage = localStorage.getItem('currentWinnersPage') || '1';
        this.api.getWinnersByPage(+currentWinnersPage).then((winners) => {
            winners.map((winner: winnerDataType) => {
                const winnerRow = this.createTagElement('div', ['winner-row', 'cell']);
                const winnerNum = this.createTagElement('div', ['winner-Num', 'cell'], `${winner.id}`);
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

                this.table.append(winnerRow);
            });
        });
        this.api.getAllWinners().then((allWinners) => {
            this.winners.append(this.paginationView.createButtons(`${allWinners.length}`, this));
        });

        return this.table;
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
