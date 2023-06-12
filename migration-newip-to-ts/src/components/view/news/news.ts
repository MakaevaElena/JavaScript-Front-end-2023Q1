import './news.css';
import { IArticle } from '../../../types/index';

class News {
    draw(data: Array<IArticle>) {
        const news: IArticle[] = data.length >= 10 ? data.filter((_item: IArticle, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: IArticle, idx: number) => {
            if (!newsItemTemp) throw new Error('error');
            const newsClone = <HTMLElement>newsItemTemp.content.cloneNode(true);

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const newsMetaPhoto: HTMLDivElement | null = newsClone.querySelector('.news__meta-photo');
            if (newsMetaPhoto instanceof HTMLDivElement) {
                newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || '../../../img/news_placeholder.jpg'})`;
            }

            const newsMetaAuthor: HTMLLIElement | null = newsClone.querySelector('.news__meta-author');
            if (newsMetaAuthor instanceof HTMLLIElement) {
                newsMetaAuthor.textContent = item.author || item.source.name;
            }

            const newsMetaDate: HTMLLIElement | null = newsClone.querySelector('.news__meta-date');
            if (newsMetaDate instanceof HTMLLIElement) {
                newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const newsDescriptionTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
            if (newsDescriptionTitle instanceof HTMLElement) {
                newsDescriptionTitle.textContent = item.title;
            }

            const newsDescriptionSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
            if (newsDescriptionSource instanceof HTMLElement) {
                newsDescriptionSource.textContent = item.source.name;
            }

            const newsDescriptionContent: HTMLElement | null = newsClone.querySelector('.news__description-content');
            if (newsDescriptionContent instanceof HTMLElement) {
                newsDescriptionContent.textContent = item.description;
            }
            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement: HTMLElement | null = document.querySelector('.news');
        if (newsElement instanceof HTMLElement) {
            newsElement.innerHTML = '';
        }
        document.querySelector('.news')?.appendChild(fragment);
    }
}

export default News;
