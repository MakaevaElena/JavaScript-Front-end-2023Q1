import './news.css';
import { IArticle } from '../../../types/index';
import {
    NEWS_ITEM,
    NEWS_META_PHOTO,
    NEWS_META_AUTHOR,
    NEWS_META_DATE,
    NEWS_DESCRIPTION_TITLE,
    NEWS_DESCRIPTION_SOURCE,
    NEWS_DESCRIPTION_CONTENT,
    NEWS_READ_MORE_LINK,
    NEWS,
    NEWS_ITEM_TEMP,
} from '../../../constants';

class News {
    draw(data: Array<IArticle>) {
        const news: IArticle[] = data.length >= 10 ? data.filter((_item: IArticle, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector(NEWS_ITEM_TEMP);

        news.forEach((item: IArticle, idx: number) => {
            if (!newsItemTemp) throw new Error('error');
            const newsClone = <HTMLElement>newsItemTemp.content.cloneNode(true);

            if (idx % 2) newsClone.querySelector(NEWS_ITEM)?.classList.add('alt');

            const newsMetaPhoto: HTMLDivElement | null = newsClone.querySelector(NEWS_META_PHOTO);
            if (newsMetaPhoto instanceof HTMLDivElement) {
                newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || '../../../img/news_placeholder.jpg'})`;
            }

            const newsMetaAuthor: HTMLLIElement | null = newsClone.querySelector(NEWS_META_AUTHOR);
            if (newsMetaAuthor instanceof HTMLLIElement) {
                newsMetaAuthor.textContent = item.author || item.source.name;
            }

            const newsMetaDate: HTMLLIElement | null = newsClone.querySelector(NEWS_META_DATE);
            if (newsMetaDate instanceof HTMLLIElement) {
                newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const newsDescriptionTitle: HTMLElement | null = newsClone.querySelector(NEWS_DESCRIPTION_TITLE);
            if (newsDescriptionTitle instanceof HTMLElement) {
                newsDescriptionTitle.textContent = item.title;
            }

            const newsDescriptionSource: HTMLElement | null = newsClone.querySelector(NEWS_DESCRIPTION_SOURCE);
            if (newsDescriptionSource instanceof HTMLElement) {
                newsDescriptionSource.textContent = item.source.name;
            }

            const newsDescriptionContent: HTMLElement | null = newsClone.querySelector(NEWS_DESCRIPTION_CONTENT);
            if (newsDescriptionContent instanceof HTMLElement) {
                newsDescriptionContent.textContent = item.description;
            }
            newsClone.querySelector(NEWS_READ_MORE_LINK)?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement: HTMLElement | null = document.querySelector(NEWS);
        if (newsElement instanceof HTMLElement) {
            newsElement.innerHTML = '';
        }
        document.querySelector(NEWS)?.appendChild(fragment);
    }
}

export default News;
