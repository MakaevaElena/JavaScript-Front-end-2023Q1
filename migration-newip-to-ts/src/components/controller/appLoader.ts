import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        // super('https://newsapi.org/v2/', {
        //     apiKey: 'f4e7ac2d5bec4aa3a63a49c9bb3a9ea3', // получите свой ключ https://newsapi.org/
        // });
        super('https://rss-news-api.onrender.com/', {
            apiKey: 'f4e7ac2d5bec4aa3a63a49c9bb3a9ea3',
        });
        // super('http://127.0.0.1:8075/', {
        //     apiKey: 'f4e7ac2d5bec4aa3a63a49c9bb3a9ea3',
        // });
    }
}

export default AppLoader;
