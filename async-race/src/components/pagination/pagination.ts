import './style.css';

export default class PaginationView {
    private pagination = document.createElement('div');

    private pageCount = 6;

    constructor() {
        this.createButtons();
    }

    public createButtons() {
        this.pagination.classList.add('pagination');

        for (let i = 1; i <= this.pageCount; i++) {
            const pageButton = document.createElement('div');
            pageButton.classList.add('page-button', 'button');
            pageButton.innerHTML = i.toString();
            this.pagination.append(pageButton);
        }
        return this.pagination;
    }
}
