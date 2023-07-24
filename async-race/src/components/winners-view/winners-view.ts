import { WinnerDataType, CarType } from './../../types/types';
import './style.css';
import { CAR_IMAGE } from '../car-view/car-image';
import Api from '../../api';
import DefaultView from '../main-view/default-view';
import PaginationView from '../pagination/pagination';
import { TagNames } from '../../enums/views/tag-names';
import { WinnersViewCssClasses, CommonCssClasses, CarViewCssClasses } from '../../enums/views/css-classes';
import { Storage } from '../../enums/storage-names';
import { START_PAGE } from '../../constants';
import { ApiAttributes } from '../../enums/api';
import { Attributes } from '../../enums/views/css-attributes';

const TABLE_HEADER_NUMBER_INNER_HTML = 'Number';
const TABLE_HEADER_CAR_INNER_HTML = 'Car';
const TABLE_HEADER_NAME_INNER_HTML = 'Name';
const TABLE_HEADER_WINS_INNER_HTML = 'Wins  &darr;';
const TABLE_HEADER_TIME_INNER_HTML = 'Best time &uarr;';
const WINNERS_LIMIT = 10;
const GET_WINNERS_BY_PAGE_ERROR = 'no winners';
const GET_ALL_WINNERS_ERROR = 'no winners';

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
        TABLE_HEADER_NUMBER_INNER_HTML
    );
    private tableHeaderCar = this.createTagElement(
        TagNames.BLOCK,
        [WinnersViewCssClasses.TABLE_HEADER_CAR, WinnersViewCssClasses.CELL, CommonCssClasses.BUTTON],
        TABLE_HEADER_CAR_INNER_HTML
    );
    private tableHeaderName = this.createTagElement(
        TagNames.BLOCK,
        [WinnersViewCssClasses.TABLE_HEADER_NAME, WinnersViewCssClasses.CELL, CommonCssClasses.BUTTON],
        TABLE_HEADER_NAME_INNER_HTML
    );
    private tableHeaderWins = this.createTagElement(
        TagNames.BLOCK,
        [WinnersViewCssClasses.TABLE_HEADER_WINS, WinnersViewCssClasses.CELL, CommonCssClasses.BUTTON],
        TABLE_HEADER_WINS_INNER_HTML
    );
    private tableHeaderTime = this.createTagElement(
        TagNames.BLOCK,
        [WinnersViewCssClasses.TABLE_HEADER_TIME, WinnersViewCssClasses.CELL, CommonCssClasses.BUTTON],
        TABLE_HEADER_TIME_INNER_HTML
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
        const isGarage = localStorage.getItem(Storage.IS_GARAGE);
        if (isGarage === 'true' || !isGarage) this.hideWinners();
        if (isGarage === 'false') this.showWinners();
        this.createWinnersTable();
        this.sortByID();
        this.sortByTyme();
        this.sortByWins();
        return this.winners;
    }

    public createWinnersTable(sort = ApiAttributes.ID, order = ApiAttributes.ASC) {
        const currentWinnersPage = localStorage.getItem(Storage.CURRENT_WINNERS_PAGE) || START_PAGE;
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
                            `${(+currentWinnersPage - 1) * WINNERS_LIMIT + i + 1}`
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
                            if (carSVGElement) carSVGElement.setAttribute(Attributes.FILL, `${carData.color}`);

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
            .catch(() => console.log(GET_WINNERS_BY_PAGE_ERROR));

        this.api
            .getAllWinners()
            .then((allWinners) => {
                if (allWinners) {
                    this.winnerHeader.innerText = `Winners (${allWinners.length})`;
                    this.winners.append(
                        this.winnerHeader,
                        this.pageNumberHeader,
                        this.table,
                        this.paginationView.createButtons(`${allWinners.length}`, this, WINNERS_LIMIT)
                    );
                }
            })
            .catch(() => console.log(GET_ALL_WINNERS_ERROR));

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
        localStorage.setItem(Storage.IS_GARAGE, 'false');
    }

    public hideWinners() {
        this.winners.classList.remove(CommonCssClasses.SHOW);
        this.winners.classList.add(CommonCssClasses.HIDE);
        localStorage.setItem(Storage.IS_GARAGE, 'true');
    }

    private sortByID() {
        this.tableHeaderNum.addEventListener('click', () =>
            this.createWinnersTable(ApiAttributes.ID, ApiAttributes.ASC)
        );
    }

    private sortByWins() {
        this.tableHeaderWins.addEventListener('click', () =>
            this.createWinnersTable(ApiAttributes.WINS, ApiAttributes.DESC)
        );
    }

    private sortByTyme() {
        this.tableHeaderTime.addEventListener('click', () =>
            this.createWinnersTable(ApiAttributes.TYME, ApiAttributes.ASC)
        );
    }
}
