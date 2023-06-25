export default abstract class DefaultView {
  protected htmlElement: HTMLElement;

  constructor() {
    this.htmlElement = this.createHtml();
  }

  getHtmlElement() {
    return this.htmlElement;
  }

  protected createTagElement = (
    tagName: string,
    className: string[],
    text: string
  ): HTMLElement => {
    const element = document.createElement(tagName);
    element.classList.add(...className);
    element.innerHTML = text || "";
    return element;
  };

  protected createLineNumber = (): HTMLDivElement => {
    const lineNumbers = document.createElement("div");
    lineNumbers.classList.add("line-numbers");
    for (let i = 0; i < 20; i += 1) {
      const numberBlock = document.createElement("div");
      numberBlock.classList.add("line-number");
      numberBlock.innerHTML = `${i + 1}`;
      // lineNumber.innerHTML += `${i + 1}<br>`;
      lineNumbers.append(numberBlock);
    }
    return lineNumbers;
  };

  protected saveLevelNumber = (levelNum: number) => {
    const savedLevel = +levelNum;
    localStorage.setItem("savedLevel", JSON.stringify(savedLevel));
  };

  protected abstract createHtml<T>(param?: T): HTMLElement;
}
