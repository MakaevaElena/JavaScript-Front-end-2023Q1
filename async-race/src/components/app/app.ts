import './style.css';
import GarageView from '../garage-view/garage-view';
import HeaderView from '../header-view/header-view';
import WinnersView from '../winners-view/winners-view';

export default class App {
    constructor() {
        this.createApp();
    }

    private createApp() {
        const app = document.createElement('div');
        app.classList.add('app');

        const garageView = new GarageView();
        const winnersView = new WinnersView();
        const headerView = new HeaderView(garageView, winnersView);
        app.append(headerView.getHeaderView(), garageView.getGarageView(), winnersView.getWinnersView());
        document.body.append(app);
    }
}
