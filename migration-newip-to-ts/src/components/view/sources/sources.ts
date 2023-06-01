import './sources.css';
import { Source } from '../../../types/index';

class Sources {
    draw(data: Array<Source>) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: Source) => {
            if (!sourceItemTemp) throw new Error('error');
            const sourceClone = <HTMLElement>sourceItemTemp.content.cloneNode(true);

            (sourceClone.querySelector('.source__item-name') as HTMLSpanElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLDivElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
