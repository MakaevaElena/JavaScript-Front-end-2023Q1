import './style.css';

export default class HeaderView {
    protected headerView: HTMLElement;
    private header = document.createElement('div');
    private headerButtons = document.createElement('div');
    private toGarageButton = document.createElement('button');
    private toWinnersButton = document.createElement('button');

    constructor() {
        this.headerView = this.createHeader();
    }

    getHeaderView() {
        return this.headerView;
    }

    private createHeader() {
        this.header.classList.add('header');
        this.headerButtons.classList.add('header-buttons');
        this.toGarageButton.classList.add('to-garage', 'button');
        this.toGarageButton.innerHTML = `to garage`;
        this.toWinnersButton.classList.add('to-winners', 'button');
        this.toWinnersButton.innerHTML = `to winners`;

        this.headerButtons.append(this.toGarageButton, this.toWinnersButton);
        this.header.append(this.headerButtons);
        // header.innerHTML = `
        // <div class="header-buttons">
        //   <button class="to-garage button">to garage</button>
        //   <button class="to-winners button">to winners</button>
        // </div>
        // `;
        return this.header;
    }
}
