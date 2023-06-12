import './sources.css';
import { ISource } from '../../../types/index';

class Sources {
    draw(data: Array<ISource>) {
        const sourseList: Element | null = document.querySelector('.sources.buttons');
        if (sourseList !== null) sourseList.innerHTML = '';
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: ISource): void => {
            if (!sourceItemTemp) throw new Error('error');
            const sourceClone = <HTMLElement>sourceItemTemp.content.cloneNode(true);

            const sourceItemName: HTMLSpanElement | null = sourceClone.querySelector('.source__item-name');
            if (sourceItemName instanceof HTMLSpanElement) {
                sourceItemName.textContent = item.name;
            }

            const sourceIt: HTMLDivElement | null = sourceClone.querySelector('.source__item');
            if (sourceIt instanceof HTMLDivElement) {
                sourceIt.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
