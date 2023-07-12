import GarageView from '../garage-view/garage-view';
import './style.css';
// import Api from '../../api';
// import { CarsType } from '../../types/types';

export default class PaginationView {
    private pagination = document.createElement('div');
    garageView: GarageView;

    constructor(garageView: GarageView) {
        this.garageView = garageView;
        this.choosePage();
    }

    public createButtons(totalCountCars: string) {
        this.pagination.classList.add('pagination');
        const buttonsCount = Math.ceil(+totalCountCars / 7);

        for (let i = 1; i <= buttonsCount; i++) {
            const pageButton = document.createElement('div');
            pageButton.classList.add('page-button', 'button');
            pageButton.setAttribute('id', `${i}`);
            pageButton.innerHTML = i.toString();

            this.pagination.append(pageButton);
        }
        return this.pagination;
    }

    private choosePage() {
        let currentPage;
        this.pagination.addEventListener('click', async (event) => {
            if (event.target instanceof HTMLElement && event.target.classList.contains('page-button')) {
                currentPage = event.target.getAttribute('id');
                if (currentPage) {
                    localStorage.setItem('currentPage', currentPage);
                    this.garageView.setPage(currentPage);
                }
            }
        });
    }
}
