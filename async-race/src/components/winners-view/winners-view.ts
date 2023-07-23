import { WinnerDataType, CarType } from './../../types/types';
import './style.css';
import { CAR_IMAGE } from '../car-view/car-image';
import Api from '../../api';
import DefaultView from '../main-view/default-view';
import PaginationView from '../pagination/pagination';
import { TagNames } from '../../enums/views/tag-names';
import { WinnersViewCssClasses, CommonCssClasses, CarViewCssClasses } from '../../enums/views/css-classes';

export default class WinnersView extends DefaultView {
    private api = new Api();
    protected winnersView: HTMLElement;
    private winners = this.createTagElement(TagNames.BLOCK, [WinnersViewCssClasses.WINNERS, CommonCssClasses.HIDE]);
    private table = this.createTagElement(TagNames.BLOCK, [WinnersViewCssClasses.WINNERS_TABLE]);
    private winnerHeader = this.createTagElement(TagNames.HEADER_SECOND, []);
    private pageNumberHeader = this.createTagElement(TagNames.HEADER_THIRD, []);
    private paginationView: PaginationView;

    private tableHeaderNum = this.createTagElement(
        TagNames.BLOCK,
        [WinnersViewCssClasses.TABLE_HEADER_NUMBER, WinnersViewCssClasses.CELL, CommonCssClasses.BUTTON],
        'Number'
    );
    private tableHeaderCar = this.createTagElement(
        TagNames.BLOCK,
        [WinnersViewCssClasses.TABLE_HEADER_CAR, WinnersViewCssClasses.CELL, CommonCssClasses.BUTTON],
        'Car'
    );
    private tableHeaderName = this.createTagElement(
        TagNames.BLOCK,
        [WinnersViewCssClasses.TABLE_HEADER_NAME, WinnersViewCssClasses.CELL, CommonCssClasses.BUTTON],
        'Name'
    );
    private tableHeaderWins = this.createTagElement(
        TagNames.BLOCK,
        [WinnersViewCssClasses.TABLE_HEADER_WINS, WinnersViewCssClasses.CELL, CommonCssClasses.BUTTON],
        'Wins  &darr;'
    );
    private tableHeaderTime = this.createTagElement(
        TagNames.BLOCK,
        [WinnersViewCssClasses.TABLE_HEADER_TIME, WinnersViewCssClasses.CELL, CommonCssClasses.BUTTON],
        'Best time &uarr;'
    );

    constructor(paginationView: PaginationView) {
        super();
        this.winnersView = this.createWinnersPage();
        this.paginationView = paginationView;
    }

    getWinnersView() {
        return this.winnersView;
    }

    private createWinnersPage() {
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

        this.createTableHeaders(this.table);

        this.api
            .getWinnersByPage(+currentWinnersPage, 10, sort, order)
            .then((winners) => {
                if (winners)
                    winners.map((winner: WinnerDataType, i: number) => {
                        const winnerRow = this.createTagElement(TagNames.BLOCK, [WinnersViewCssClasses.WINNER_ROW]);
                        const winnerNum = this.createTagElement(
                            TagNames.BLOCK,
                            [WinnersViewCssClasses.WINNER_NUM, WinnersViewCssClasses.CELL],
                            `${(+currentWinnersPage - 1) * 10 + i + 1}`
                        );
                        const winnerWins = this.createTagElement(
                            TagNames.BLOCK,
                            [WinnersViewCssClasses.WINNER_WINS, WinnersViewCssClasses.CELL],
                            `${winner.wins}`
                        );

                        // let lastBestTyme = localStorage.getItem(`${winner.id}Time`);
                        // if (!lastBestTyme) lastBestTyme = '' + winner.time;
                        // if (winner.time <= +lastBestTyme) {
                        //     lastBestTyme = `${winner.time}`;
                        //     localStorage.setItem(`${winner.id}Time`, lastBestTyme);
                        //     this.api.updateWinner(winner.id, { wins: winner.wins, time: +lastBestTyme });
                        // }

                        const winnerTime = this.createTagElement(
                            TagNames.BLOCK,
                            [WinnersViewCssClasses.WINNER_TIME, WinnersViewCssClasses.CELL],
                            `${Math.round(winner.time)}`
                        );

                        this.api.getCar(winner.id).then((carData: CarType) => {
                            const winnerCar = this.createTagElement(TagNames.BLOCK, [
                                WinnersViewCssClasses.WINNER_CAR,
                                WinnersViewCssClasses.CELL,
                            ]);
                            winnerCar.innerHTML = CAR_IMAGE;
                            const carSVGElement = winnerCar.querySelector(CarViewCssClasses.SVG);
                            if (carSVGElement) carSVGElement.setAttribute('fill', `${carData.color}`);

                            const winnerName = this.createTagElement(
                                TagNames.BLOCK,
                                [WinnersViewCssClasses.WINNER_NAME, WinnersViewCssClasses.CELL],
                                `${carData.name}`
                            );
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
                        this.paginationView.createButtons(`${allWinners.length}`, this, 10)
                    );
                }
            })
            .catch(() => console.log('no winners'));

        // return this.table;
    }
    private createTableHeaders(table: HTMLElement) {
        const tableHeader = this.createTagElement(TagNames.BLOCK, [
            WinnersViewCssClasses.WINNER_ROW,
            WinnersViewCssClasses.TABLE_HEADER,
        ]);

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
        this.winners.classList.add(CommonCssClasses.SHOW);
        this.winners.classList.remove(CommonCssClasses.HIDE);
        localStorage.setItem('isGarage', 'false');
    }

    public hideWinners() {
        this.winners.classList.remove(CommonCssClasses.SHOW);
        this.winners.classList.add(CommonCssClasses.HIDE);
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
