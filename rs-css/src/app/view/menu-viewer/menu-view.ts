import "./style.css";
import DefaultView from "../default-view";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import { levels } from "../../data/data-levels";

export default class MenuView extends DefaultView {
  private levelNum = Number(localStorage.getItem("savedLevel")) || 1;
  private levelList = this.createTagElement("ul", ["level-list"], "");
  private readyTick = this.createTagElement("span", ["no-done"], "");
  private tickIsHelp = this.createTagElement("span", ["is-help"], "");
  private resetButton = this.createTagElement("div", ["reset-button"], "Reset");
  constructor() {
    super();
    this.configureHtml(this.levelNum);
  }

  public configureHtml(level: number) {
    this.levelList.innerHTML = "";

    for (let i = 0; i < levels.length; i += 1) {
      const readyTick = this.createTagElement("span", ["no-done"], "");
      const readyTickBlock = readyTick ? readyTick : this.readyTick;
      this.readyTick.setAttribute("id", `${i + 1}`);

      const tickIsHelp = this.createTagElement("span", ["is-help"], "");
      const tickIsHelpBlock = tickIsHelp ? tickIsHelp : this.tickIsHelp;
      this.readyTick.setAttribute("id", `${i + 1}`);

      const levelLine = this.createTagElement(
        "li",
        ["level-line"],
        `Level ${levels[i].level}. ${levels[i].syntax}`
      );

      let resultsWithHelp = localStorage.getItem("results") || "";
      if (!resultsWithHelp) {
        resultsWithHelp = JSON.stringify(new Array(levels.length).fill(false));
      }

      if (resultsWithHelp !== null) {
        const resultsWithHelpArr = JSON.parse(resultsWithHelp);

        if (resultsWithHelpArr[i] === true) {
          levelLine.prepend(tickIsHelpBlock);
        }
      }

      levelLine.prepend(readyTickBlock);

      this.levelList.append(levelLine);
      if (i === level - 1) {
        levelLine.style.boxShadow = "0 0 10px #0000004d";
        levelLine.style.fontSize = "1.5rem";
        levelLine.style.fontWeight = "600";
      }

      let results = localStorage.getItem("results") || "";
      if (!results) {
        results = JSON.stringify(new Array(levels.length).fill(false));
      }
      if (results !== null) {
        const resultArr = JSON.parse(results);

        if (resultArr[i] === true) {
          readyTickBlock.classList.remove("no-done");
          readyTickBlock.classList.add("done");
        }
        if (resultArr[i] === null) {
          readyTickBlock.classList.remove("done");
          readyTickBlock.classList.add("no-done");
        }
      }
    }

    this.htmlElement.append(this.levelList);
    if (this.levelList instanceof HTMLUListElement) {
      this.levelList.childNodes.forEach((node, i) => {
        node.addEventListener("click", () => {
          level = i + 1;
          this.saveLevelNumber(level);
          window.location.reload();
          // this.configureHtml(level);
        });
      });
    }
    this.createResetButton();
  }

  private createResetButton() {
    this.levelList.append(this.resetButton);
    this.resetButton.addEventListener("click", () => {
      const arr = new Array(levels.length).fill("false");
      arr.forEach((_, i) => {
        this.saveResult(i, false);
        this.saveIsUseHelp(i, false);
      });
      this.configureHtml(this.levelNum);
      const readyButton = document.querySelector(".ready-button-done");
      readyButton?.classList.remove("ready-button-done");
      readyButton?.classList.add("ready-button-no-done");
    });
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);

    element.classList.add(CssClasses.MENU);
    return element;
  }
}
