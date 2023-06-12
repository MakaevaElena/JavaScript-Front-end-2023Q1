import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: 'f4e7ac2d5bec4aa3a63a49c9bb3a9ea3',
        });
    }
}

export default AppLoader;
