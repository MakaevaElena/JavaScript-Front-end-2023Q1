import { DataType, StatusCode, RequestMethod, Endpoints } from '../../types/index';

type Options = Record<string, string>;

class Loader {
    constructor(public baseLink: string, public options: Options) {}

    getResp(
        { endpoint, options = {} }: { endpoint: Endpoints; options: Options },
        callback = () => {
            throw new Error('No callback for GET response');
        }
    ) {
        this.load(RequestMethod.GET, endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === StatusCode.Unauthorized || res.status === StatusCode.PageNotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Options, endpoint: Endpoints) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: Endpoints, callback: (data: DataType) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
