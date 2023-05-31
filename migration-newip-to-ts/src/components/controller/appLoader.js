import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'f4e7ac2d5bec4aa3a63a49c9bb3a9ea3', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
