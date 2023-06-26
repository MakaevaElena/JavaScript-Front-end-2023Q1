import { levels } from "../data/data-levels";

export default abstract class DefaultView {
  protected htmlElement: HTMLElement;
  private results = new Array(levels.length);

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
      // lineNumber.innerHTML += `${i + 1}<br>`;
      lineNumbers.append(numberBlock);
    }
    return lineNumbers;
  };

  protected saveLevelNumber = (levelNum: number) => {
    const savedLevel = +levelNum;
    localStorage.setItem("savedLevel", JSON.stringify(savedLevel));
  };

  //TODO
  protected saveResult = (levelNum: number, isDone: boolean) => {
    // const results = new Array(levels.length);

    let prev = localStorage.getItem("results");
    if (!prev) {
      prev = JSON.stringify(new Array(levels.length).fill(false));
    }
    if (prev !== null) {
      console.log(prev);
      // this.results.push(...JSON.parse(prev));

      //   const trueIDs = JSON.parse(prev).reduce(
      //     (newArr: number[], el: boolean, i: number) => {
      //       if (el === true) {
      //         // console.log(newArr);
      //         [...newArr, i];
      //       }
      //     },
      //     []
      //   );
      //   console.log(trueIDs);
      const results = JSON.parse(prev);
      results[levelNum] = isDone;
      this.results = results;
    }

    // this.results[levelNum] = isDone;

    localStorage.setItem("results", JSON.stringify(this.results));
  };

  protected abstract createHtml<T>(param?: T): HTMLElement;
}
