import './news.css';
import { Article } from '../../../types/index';

// type newsItemTempType = {};

class News {
    draw(data: Array<Article>) {
        const news = data.length >= 10 ? data.filter((_item: Article, idx: number) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: Article, idx: number) => {
            if (!newsItemTemp) throw new Error('error');
            const newsClone = <HTMLElement>newsItemTemp.content.cloneNode(true);
            // if (!newsClone) throw new Error('error');
            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            newsClone.querySelector<HTMLElement>('.news__meta-photo')!.style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            newsClone.querySelector('.news__meta-author')!.textContent = item.author || item.source.name;
            newsClone.querySelector('.news__meta-date')!.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector('.news__description-title')!.textContent = item.title;
            newsClone.querySelector('.news__description-source')!.textContent = item.source.name;
            newsClone.querySelector('.news__description-content')!.textContent = item.description;
            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector('.news')!.innerHTML = '';
        document.querySelector('.news')?.appendChild(fragment);
    }
}

export default News;
