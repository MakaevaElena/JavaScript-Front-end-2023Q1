export default class DefaultView {
    protected createTagElement<K extends keyof HTMLElementTagNameMap>(tagName: K, className: string[], text = '') {
        const element = document.createElement(tagName);
        element.classList.add(...className);
        element.innerHTML = text || '';
        return element;
    }
}
