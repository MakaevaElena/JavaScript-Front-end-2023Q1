import GarageView from '../garage-view/garage-view';
import WinnersView from '../winners-view/winners-view';
import './style.css';
import { TagNames } from '../../enums/views/tag-names';
import { CommonCssClasses, PaginationViewCssClasses } from '../../enums/views/css-classes';
import DefaultView from '../main-view/default-view';

export default class PaginationView extends DefaultView {
    private pagination = this.createTagElement(TagNames.BLOCK, [PaginationViewCssClasses.PAGINATION]);
    private garageView: GarageView;

    constructor(garageView: GarageView) {
        super();
        this.garageView = garageView;
    }

    public createButtons(totalCountCars: string, winnersView: WinnersView | null, limit: number) {
        this.pagination.innerHTML = '';
        const buttonsCount = Math.ceil(+totalCountCars / limit);

        for (let i = 1; i <= buttonsCount; i++) {
            const pageButton = this.createTagElement(
                TagNames.BLOCK,
                [PaginationViewCssClasses.PAGE_BUTTON, CommonCssClasses.BUTTON],
                i.toString()
            );
            pageButton.setAttribute('id', `${i}`);

            pageButton.addEventListener('click', () => this.choosePage(i, winnersView));

            this.pagination.append(pageButton);
        }
        return this.pagination;
    }

    private choosePage(currentPage: number, winnersView: WinnersView | null) {
        const isGarage = localStorage.getItem('isGarage');
        if (isGarage === 'true') {
            localStorage.setItem('currentPage', currentPage.toString());
            this.garageView.createRaceRoad();
        }
        if (isGarage === 'false') {
            localStorage.setItem('currentWinnersPage', currentPage.toString());
            if (winnersView !== null) winnersView.createWinnersTable();
        }
    }
}
