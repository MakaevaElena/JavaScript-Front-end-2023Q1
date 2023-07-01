import { levels } from "../data/data-levels";

export default abstract class DefaultView {
  protected htmlElement: HTMLElement;
  private results = new Array(levels.length);
  private resultsWithHelp = new Array(levels.length);

  constructor() {
    this.htmlElement = this.createHtml();
  }

  getHtmlElement() {
    return this.htmlElement;
  }

  protected createTagElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    className: string[],
    text: string
  ) {
    const element = document.createElement(tagName);
    element.classList.add(...className);
    element.innerHTML = text || "";
    return element;
  }

  protected createLineNumber = (): HTMLDivElement => {
    const lineNumbers = document.createElement("div");
    lineNumbers.classList.add("line-numbers");
    for (let i = 0; i < 20; i += 1) {
      const numberBlock = document.createElement("div");
      numberBlock.classList.add("line-number");
      numberBlock.innerHTML = `${i + 1}`;
      lineNumbers.append(numberBlock);
    }
    return lineNumbers;
  };

  protected saveLevelNumber = (levelNum: number) => {
    const savedLevel = +levelNum;
    localStorage.setItem("savedLevel", JSON.stringify(savedLevel));
  };

  protected saveResult = (levelNum: number, isDone: boolean) => {
    let prev = localStorage.getItem("results");
    if (!prev) {
      prev = JSON.stringify(new Array(levels.length).fill(false));
    }
    if (prev !== null) {
      const results: boolean[] = JSON.parse(prev);

      if (results.filter((el: boolean) => el === false).length === 0) {
        alert("YOU WIN! RESET PROGRESS AND START AGAIN");
      }

      results[levelNum] = isDone;
      this.results = results;
    }

    localStorage.setItem("results", JSON.stringify(this.results));
  };

  protected saveIsUseHelp = (levelNum: number, isUseHelp: boolean) => {
    let prev = localStorage.getItem("resultsWithHelp");
    if (!prev) {
      prev = JSON.stringify(new Array(levels.length).fill(false));
    }
    if (prev !== null) {
      const resultsWithHelp: boolean[] = JSON.parse(prev);

      resultsWithHelp[levelNum] = isUseHelp;
      this.resultsWithHelp = resultsWithHelp;
    }

    localStorage.setItem(
      "resultsWithHelp",
      JSON.stringify(this.resultsWithHelp)
    );
  };

  protected abstract createHtml<T>(param?: T): HTMLElement;
}
