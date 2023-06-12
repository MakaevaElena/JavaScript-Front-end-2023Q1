import News from './news/news';
import Sources from './sources/sources';
import { IArticle, ISource } from '../../types/interfaces';
import { DataType } from '../../types/types';

export class AppView {
    public news: News;
    public sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data?: DataType) {
        const values: IArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data?: DataType) {
        const values: ISource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    searchSources(e: Event, data?: DataType) {
        const target: EventTarget | null = e.target;
        if (target instanceof HTMLInputElement) {
            if (data?.sources) {
                const filtered = data?.sources.filter((el) =>
                    el.name?.toLowerCase().includes(target.value.toLowerCase())
                );
                const values = filtered ? filtered : data?.sources;
                this.sources.draw(values);
            }
        }
    }
}

export default AppView;
