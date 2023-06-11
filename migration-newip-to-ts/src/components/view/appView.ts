import News from './news/news';
import Sources from './sources/sources';
import { Article, DataType, Source } from '../../types/index';

// type AppViewType = {
//     news: {
//         draw: (data: Array<Article>) => void;
//     };

//     sources: {
//         draw: (data: Array<Source>) => void;
//     };
// };

export class AppView {
    public news: News;
    public sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data?: DataType) {
        const values: Article[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data?: DataType) {
        const values: Source[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    searchSources(e: Event, data?: DataType) {
        // const values = data?.sources
        //     ? data?.sources.filter((el) => el.name?.includes((e.target as HTMLInputElement).value))
        //     : [];
        // this.sources.draw(values);

        if (data?.sources) {
            const filtered = data?.sources.filter((el) =>
                el.name?.toLowerCase().includes((e.target as HTMLInputElement).value.toLowerCase())
            );
            const values = filtered ? filtered : data?.sources;
            this.sources.draw(values);
        }
    }
}

export default AppView;
