import News from './news/news';
import Sources from './sources/sources';
import { Article, Source } from '../../types/index';

type DataType = {
    articles: Article[];
    sources: Source[];
};

// type AppViewType = {
//     news: {
//         draw: (data: Array<Article>) => void;
//     };

//     sources: {
//         draw: (data: Array<Source>) => void;
//     };
// };

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: DataType) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: DataType) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
