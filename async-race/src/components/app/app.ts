import './style.css';
import GarageView from '../garage-view/garage-view';
import HeaderView from '../header-view/header-view';
import WinnersView from '../winners-view/winners-view';
import PaginationView from '../pagination/pagination';

export default class App {
    constructor() {
        this.createApp();
    }

    private createApp() {
        const app = document.createElement('div');
        app.classList.add('app');

        // const form = new FormView();
        const garageView = new GarageView();
        const paginationView = new PaginationView(garageView);
        const winnersView = new WinnersView(paginationView);
        const headerView = new HeaderView(garageView, winnersView);

        // const garageElement = garageView.getGarageView();
        // garageElement.append(form.createForm());

        app.append(headerView.getHeaderView(), garageView.getGarageView(), winnersView.getWinnersView());
        document.body.append(app);
    }
}
