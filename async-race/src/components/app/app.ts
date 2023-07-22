import './style.css';
import GarageView from '../garage-view/garage-view';
import HeaderView from '../header-view/header-view';
import WinnersView from '../winners-view/winners-view';
import PaginationView from '../pagination/pagination';
import Observer from '../app/observer/observer';

export default class App {
    constructor() {
        this.createApp();
    }

    private createApp() {
        const app = document.createElement('div');
        app.classList.add('app');

        const observer = new Observer();
        const garageView = new GarageView(observer);
        const paginationView = new PaginationView(garageView);
        const winnersView = new WinnersView(paginationView);
        const headerView = new HeaderView(garageView, winnersView);

        app.append(headerView.getHeaderView(), garageView.getGarageView(), winnersView.getWinnersView());
        document.body.append(app);
    }
}
