import './sources.css';
import { ISource } from '../../../types/index';
import { SOURCES_BUTTONS, SOURCE_ITEM_NAME, SOURCE_ITEM_TEMP, SOURCE_ITEM, SOURCES } from '../../../constants';

class Sources {
    draw(data: Array<ISource>) {
        const sourseList: Element | null = document.querySelector(SOURCES_BUTTONS);
        if (sourseList !== null) sourseList.innerHTML = '';
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector(SOURCE_ITEM_TEMP);

        data.forEach((item: ISource): void => {
            if (!sourceItemTemp) throw new Error('error');
            const sourceClone = <HTMLElement>sourceItemTemp.content.cloneNode(true);

            const sourceItemName: HTMLSpanElement | null = sourceClone.querySelector(SOURCE_ITEM_NAME);
            if (sourceItemName instanceof HTMLSpanElement) {
                sourceItemName.textContent = item.name;
            }

            const sourceIt: HTMLDivElement | null = sourceClone.querySelector(SOURCE_ITEM);
            if (sourceIt instanceof HTMLDivElement) {
                sourceIt.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        document.querySelector(SOURCES)?.append(fragment);
    }
}

export default Sources;
