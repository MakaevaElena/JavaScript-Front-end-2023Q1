export enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PUTCH = 'PUTCH',
    DELETE = 'DELETE',
}

export enum Endpoints {
    Everything = 'everything',
    TopHeadlines = 'top-headlines',
    Sources = 'sources',
}

export enum StatusCode {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    TooManyRequests = 429,
    ServerError = 500,
    PageNotFound = 404,
}

export type Country =
    | 'ae'
    | 'ar'
    | 'at'
    | 'au'
    | 'be'
    | 'bg'
    | 'br'
    | 'ca'
    | 'ch'
    | 'cn'
    | 'co'
    | 'cu'
    | 'cz'
    | 'de'
    | 'eg'
    | 'fr'
    | 'gb'
    | 'gr'
    | 'hk'
    | 'hu'
    | 'id'
    | 'ie'
    | 'il'
    | 'in'
    | 'it'
    | 'jp'
    | 'kr'
    | 'lt'
    | 'lv'
    | 'ma'
    | 'mx'
    | 'my'
    | 'ng'
    | 'nl'
    | 'no'
    | 'nz'
    | 'ph'
    | 'pl'
    | 'pt'
    | 'ro'
    | 'rs'
    | 'ru'
    | 'sa'
    | 'se'
    | 'sg'
    | 'si'
    | 'sk'
    | 'th'
    | 'tr'
    | 'tw'
    | 'ua'
    | 'us'
    | 've'
    | 'za';

export type Language = 'ar' | 'de' | 'en' | 'es' | 'fr' | 'he' | 'it' | 'nl' | 'no' | 'pt' | 'ru' | 'sv' | 'ud' | 'zh';

export type Category = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

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

export type DataType = {
    readonly articles: IArticle[];
    readonly sources: ISource[];
};
