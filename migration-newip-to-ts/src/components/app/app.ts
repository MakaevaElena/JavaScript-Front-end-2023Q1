import AppController from '../controller/controller';
import { AppView } from '../view/appView';
// import { DataType } from '../../types/index';

class App {
    public controller: AppController;
    public view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );

        this.controller.getSources((data) => {
            this.view.drawSources(data);
        });

        (document.querySelector('.search-input') as HTMLElement).addEventListener('input', (e: Event) => {
            if (e) {
                this.controller.getSources((data) => {
                    // this.view.drawSources(data);
                    this.view.searchSources(e, data);
                });
            }
        });
    }
}

export default App;
