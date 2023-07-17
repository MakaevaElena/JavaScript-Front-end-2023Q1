import GarageView from '../garage-view/garage-view';
import WinnersView from '../winners-view/winners-view';
import './style.css';

export default class PaginationView {
    private pagination = document.createElement('div');
    private garageView: GarageView;

    constructor(garageView: GarageView) {
        this.garageView = garageView;
    }

    public createButtons(totalCountCars: string, winnersView: WinnersView | null) {
        this.pagination.innerHTML = '';
        this.pagination.classList.add('pagination');
        const buttonsCount = Math.ceil(+totalCountCars / 7);

        for (let i = 1; i <= buttonsCount; i++) {
            const pageButton = document.createElement('div');
            pageButton.classList.add('page-button', 'button');
            pageButton.setAttribute('id', `${i}`);
            pageButton.innerHTML = i.toString();

            pageButton.addEventListener('click', () => this.choosePage(i, winnersView));

            this.pagination.append(pageButton);
        }
        return this.pagination;
    }

    private choosePage(currentPage: number, winnersView: WinnersView | null) {
        const isGarage = localStorage.getItem('isGarage');
        console.log(isGarage);
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
