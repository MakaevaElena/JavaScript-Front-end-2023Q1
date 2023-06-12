import { Category, Country, Language } from './types';

export interface ISource {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly url?: string;
    readonly category?: Category;
    readonly language?: Language;
    readonly country?: Country;
}

export interface IArticle {
    readonly source: ISource;
    readonly author: string;
    readonly title: string;
    readonly description: string;
    readonly url: string;
    readonly urlToImage: string;
    readonly publishedAt: string;
    readonly content: string;
}

export interface IRequest {
    readonly country: string;
    readonly category: string;
    readonly sources: string;
    readonly q: string;
    pageSize: number;
    page: number;
}
