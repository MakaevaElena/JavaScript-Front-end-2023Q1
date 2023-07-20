import { WinnerDataType, CarType } from './../../types/types';
import './style.css';
import { carImage } from '../car-view/car-image';
import Api from '../../api';
import DefaultView from '../main-view/default-view';
import PaginationView from '../pagination/pagination';
import Observer from '../app/observer/observer';

export default class WinnersView extends DefaultView {
    private api = new Api();
    protected winnersView: HTMLElement;
    private winners = document.createElement('div');
    private table = document.createElement('div');
    private winnerHeader = document.createElement('h2');
    private pageNumberHeader = document.createElement('h3');
    private paginationView: PaginationView;
    private observer: Observer;

    private tableHeaderNum = this.createTagElement('div', ['table-header-number', 'cell', 'button'], 'Number');
    private tableHeaderCar = this.createTagElement('div', ['table-header-car', 'cell', 'button'], 'Car');
    private tableHeaderName = this.createTagElement('div', ['table-header-name', 'cell', 'button'], 'Name');
    private tableHeaderWins = this.createTagElement('div', ['table-header-wins', 'cell', 'button'], 'Wins  &darr;');
    private tableHeaderTime = this.createTagElement('div', ['table-header-time', 'cell', 'button'], 'Best time &uarr;');

    constructor(observer: Observer, paginationView: PaginationView) {
        //observer ?
        super();
        this.observer = observer;
        this.winnersView = this.createWinnersPage();
        this.paginationView = paginationView;
    }

    getWinnersView() {
        return this.winnersView;
    }

    private createWinnersPage() {
        this.winners.classList.add('winners', 'hide');
        const isGarage = localStorage.getItem('isGarage');
        if (isGarage === 'true' || !isGarage) this.hideWinners();
        if (isGarage === 'false') this.showWinners();
        this.createWinnersTable();
        this.sortByID();
        this.sortByTyme();
        this.sortByWins();
        return this.winners;
    }

    public createWinnersTable(sort = 'id', order = 'ASC') {
        const currentWinnersPage = localStorage.getItem('currentWinnersPage') || '1';
        this.table.innerHTML = '';
        this.pageNumberHeader.innerText = `Page #${currentWinnersPage}`;
        this.table.classList.add('winners-table');

        this.createTableHeaders(this.table);

        this.api
            .getWinnersByPage(+currentWinnersPage, 10, sort, order)
            .then((winners) => {
                if (winners)
                    winners.map((winner: WinnerDataType, i: number) => {
                        const winnerRow = this.createTagElement('div', ['winner-row']);
                        const winnerNum = this.createTagElement(
                            'div',
                            ['winner-Num', 'cell'],
                            `${(+currentWinnersPage - 1) * 10 + i + 1}`
                        );
                        const winnerWins = this.createTagElement('div', ['winner-wins', 'cell'], `${winner.wins}`);

                        let lastBestTyme = localStorage.getItem(`${winner.id}Time`);
                        if (!lastBestTyme) lastBestTyme = '' + winner.time;
                        if (winner.time <= +lastBestTyme) {
                            lastBestTyme = `${winner.time}`;
                            localStorage.setItem(`${winner.id}Time`, lastBestTyme);
                        }
                        const winnerTime = this.createTagElement(
                            'div',
                            ['winner-time', 'cell'],
                            `${Math.round(+lastBestTyme)}`
                        );

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
            })
            .catch(() => console.log('no winners'));

        this.api
            .getAllWinners()
            .then((allWinners) => {
                if (allWinners) {
                    this.winnerHeader.innerText = `Winners (${allWinners.length})`;
                    this.winners.append(
                        this.winnerHeader,
                        this.pageNumberHeader,
                        this.table,
                        this.paginationView.createButtons(`${allWinners.length}`, this)
                    );
                }
            })
            .catch(() => console.log('no winners'));

        // return this.table;
    }
    private createTableHeaders(table: HTMLElement) {
        const tableHeader = this.createTagElement('div', ['winner-row', 'table-header']);

        tableHeader.append(
            this.tableHeaderNum,
            this.tableHeaderCar,
            this.tableHeaderName,
            this.tableHeaderWins,
            this.tableHeaderTime
        );
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

    private sortByID() {
        this.tableHeaderNum.addEventListener('click', () => this.createWinnersTable('id', 'ASC'));
    }

    private sortByWins() {
        this.tableHeaderWins.addEventListener('click', () => this.createWinnersTable('wins', 'DESC'));
    }

    private sortByTyme() {
        this.tableHeaderTime.addEventListener('click', () => this.createWinnersTable('time', 'ASC'));
    }
}
