import './style.css';
// import Api from '../../api';
// import { CarsType } from '../../types/types';

export default class PaginationView {
    private pagination = document.createElement('div');
    // private api = new Api();
    private totalCountCars = localStorage.getItem('totalCountCars') || 1;

    constructor() {
        // this.createButtons();
        this.choosePage();
    }

    public createButtons() {
        this.pagination.classList.add('pagination');
        // console.log(this.totalCountCars);
        for (let i = 1; i <= +this.totalCountCars / 7; i++) {
            const pageButton = document.createElement('div');
            pageButton.classList.add('page-button', 'button');
            pageButton.setAttribute('id', `${i}`);
            pageButton.innerHTML = i.toString();
            // pageButton.addEventListener('click', () => {
            //     this.api.getCarsByPage(i);
            // });

            this.pagination.append(pageButton);
        }
        return this.pagination;
    }

    public async choosePage() {
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
