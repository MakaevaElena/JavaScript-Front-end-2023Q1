import './style.css';
// import Api from '../../api';
// import { CarsType } from '../../types/types';

export default class PaginationView {
    private pagination = document.createElement('div');
    // private api = new Api();
    private totalCountCars = localStorage.getItem('totalCountCars') || 4;

    constructor() {
        // this.createButtons();
        // this.choosePage();
    }

    public createButtons(totalCountCars: string) {
        // this.totalCountCars = localStorage.getItem('totalCountCars');

        this.pagination.classList.add('pagination');
        const buttonsCount = Math.ceil(+totalCountCars / 7);

        for (let i = 1; i <= buttonsCount; i++) {
            console.log('buttons');
            const pageButton = document.createElement('div');
            pageButton.classList.add('page-button', 'button');
            pageButton.setAttribute('id', `${i}`);
            pageButton.innerHTML = i.toString();

            this.pagination.append(pageButton);
            this.choosePage();
        }
        return this.pagination;
    }

    private async choosePage() {
        this.pagination.addEventListener('click', async (event) => {
            if (event.target instanceof HTMLElement && event.target.classList.contains('page-button')) {
                const id = event.target.getAttribute('id');
                if (id) {
                    localStorage.setItem('currentPage', id);
                    window.document.location.reload();
                }
            }
        });
    }
}
