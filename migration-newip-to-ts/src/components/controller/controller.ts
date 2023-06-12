import AppLoader from './appLoader';
import { DataType, Endpoints } from '../../types/index';

class AppController extends AppLoader {
    getSources(callback: (data?: DataType) => void) {
        super.getResp(
            {
                endpoint: Endpoints.Sources,
            },
            callback
        );
    }

    getNews(e: Event, callback: (data?: DataType) => void) {
        if (e.target instanceof HTMLElement) {
            let target: HTMLElement | ParentNode | null = e.target;
            const newsContainer: EventTarget | null = e.currentTarget;

            while (target !== newsContainer) {
                if (target instanceof HTMLElement) {
                    if (target.classList.contains('source__item')) {
                        const sourceId = target.getAttribute('data-source-id');

                        if (newsContainer instanceof HTMLElement) {
                            if (newsContainer.getAttribute('data-source') !== sourceId && sourceId !== null) {
                                newsContainer.setAttribute('data-source', sourceId);
                                super.getResp(
                                    {
                                        endpoint: Endpoints.Everything,
                                        options: {
                                            sources: sourceId,
                                        },
                                    },
                                    callback
                                );
                            }
                        }

                        return;
                    }
                    target = target.parentNode;
                }
            }
        }
    }
}

export default AppController;
