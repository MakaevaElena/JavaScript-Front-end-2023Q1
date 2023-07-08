import './style.css';
import GarageView from '../garage-view/garage-view';
import HeaderView from '../header-view/header-view';

export default class App {
    constructor() {
        this.createApp();
    }

    private createApp() {
        const app = document.createElement('div');
        app.classList.add('app');
        const headerView = new HeaderView();
        const garageView = new GarageView();
        app.append(headerView.getHeaderView(), garageView.getGarageView());
        document.body.append(app);
    }
}
