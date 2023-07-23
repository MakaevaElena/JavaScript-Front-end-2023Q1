import GarageView from '../garage-view/garage-view';
import DefaultView from '../main-view/default-view';
import WinnersView from '../winners-view/winners-view';
import './style.css';
import { TagNames } from '../../enums/views/tag-names';
import { HeaderViewCssClasses, CommonCssClasses } from '../../enums/views/css-classes';

export default class HeaderView extends DefaultView {
    private headerView: HTMLElement;
    garageView: GarageView;
    winnersView: WinnersView;

    private toGarageButton = this.createTagElement(
        TagNames.BUTTON,
        [HeaderViewCssClasses.TO_GARAGE, CommonCssClasses.BUTTON],
        `TO GARAGE`
    );
    private toWinnersButton = this.createTagElement(
        TagNames.BUTTON,
        [HeaderViewCssClasses.TO_WINNERS, CommonCssClasses.BUTTON],
        `TO WINNERS`
    );

    constructor(garageView: GarageView, winnersView: WinnersView) {
        super();
        this.headerView = this.createHeader();
        this.garageView = garageView;
        this.winnersView = winnersView;
    }

    getHeaderView() {
        return this.headerView;
    }

    private createHeader() {
        const header = this.createTagElement(TagNames.HEADER, [HeaderViewCssClasses.HEADER]);
        const headerButtons = this.createTagElement(TagNames.BLOCK, [HeaderViewCssClasses.HEADER_BUTTONS]);
        headerButtons.append(this.toGarageButton, this.toWinnersButton);

        header.append(headerButtons);
        this.showGarage();
        this.showWinners();
        return header;
    }

    private showGarage() {
        this.toGarageButton.addEventListener('click', () => {
            this.garageView.showGarage();
            this.winnersView.hideWinners();
            localStorage.setItem('isGarage', 'true');
        });
    }

    private showWinners() {
        this.toWinnersButton.addEventListener('click', () => {
            this.garageView.hideGarage();
            this.winnersView.showWinners();
            this.winnersView.createWinnersTable();
            localStorage.setItem('isGarage', 'false');
        });
    }
}
