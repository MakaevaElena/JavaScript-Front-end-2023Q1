import './style.css';

export default class WinnersView {
    protected winnersView: HTMLElement;
    private winners = document.createElement('div');

    constructor() {
        this.winnersView = this.createWinnersPage();
    }

    getWinnersView() {
        return this.winnersView;
    }

    private createWinnersPage() {
        this.winners.classList.add('winners');
        this.winners.innerHTML = 'WINNERS';
        return this.winners;
    }

    public showWinners() {
        this.winners.classList.add('show');
        this.winners.classList.remove('hide');
    }

    public hideWinners() {
        this.winners.classList.remove('show');
        this.winners.classList.add('hide');
    }
}
