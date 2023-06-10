import AppController from '../controller/controller';
import { AppView } from '../view/appView';
// import { DataType } from '../../types/index';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );

        (document.querySelector('.search-input') as HTMLElement).addEventListener('input', (e: Event) => {
            if (e) {
                this.controller.getSources((data) => {
                    // this.view.drawSources(data);
                    this.view.searchSources(e, data);
                });
            }
        });

        // this.controller.getSources((data) => {
        //     // this.view.drawSources(data);
        //     this.view.searchSources(data);
        // });
    }
}

export default App;
