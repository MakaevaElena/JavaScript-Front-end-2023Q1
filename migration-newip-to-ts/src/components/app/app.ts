import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { DataType } from '../../types/types';
import { SOURSES, SEARCH_INPUT } from '../../constants';

class App {
    public controller: AppController;
    public view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources: HTMLElement | null = document.querySelector(SOURSES);
        if (sources instanceof HTMLElement) {
            sources.addEventListener('click', (event) =>
                this.controller.getNews(event, (data: DataType): void => this.view.drawNews(data))
            );
        }

        this.controller.getSources((data: DataType): void => {
            this.view.drawSources(data);
        });

        const searchInput: HTMLInputElement | null = document.querySelector(SEARCH_INPUT);
        if (searchInput instanceof HTMLInputElement) {
            searchInput.addEventListener('input', (event: Event) => {
                if (event) {
                    this.controller.getSources((data: DataType): void => {
                        this.view.searchSources(event, data);
                    });
                }
            });
        }
    }
}

export default App;
