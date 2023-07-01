import "./style.css";
import DefaultView from "../default-view";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import { START_LEVEL_NUMBER, RESET_BUTTON_TEXT } from "../../data/constants";
import { Storage } from "../../enums/storage-names";
import { Attributes } from "../../enums/view/css-attributes";
import { levels } from "../../data/data-levels";

export default class MenuView extends DefaultView {
  private levelNum =
    Number(localStorage.getItem(Storage.SAVED_LEVEL)) || START_LEVEL_NUMBER;
  private levelList = this.createTagElement(
    TagNames.LIST,
    [CssClasses.LEVEL_LIST],
    ""
  );
  private readyTick = this.createTagElement(
    TagNames.SPAN,
    [CssClasses.LEVEL_NO_DONE],
    ""
  );
  private tickIsHelp = this.createTagElement(
    TagNames.SPAN,
    [CssClasses.IS_USE_HELP],
    ""
  );
  private resetButton = this.createTagElement(
    TagNames.BLOCK,
    [CssClasses.RESET_BUTTON],
    RESET_BUTTON_TEXT
  );
  constructor() {
    super();
    this.configureHtml(this.levelNum);
  }

  public configureHtml(level: number) {
    this.levelList.innerHTML = "";

    for (let i = 0; i < levels.length; i += 1) {
      const readyTick = this.createTagElement(
        TagNames.SPAN,
        [CssClasses.LEVEL_NO_DONE],
        ""
      );
      const readyTickBlock = readyTick ? readyTick : this.readyTick;
      this.readyTick.setAttribute(Attributes.ID, `${i + 1}`);

      const tickIsHelp = this.createTagElement(
        TagNames.SPAN,
        [CssClasses.IS_USE_HELP],
        ""
      );
      const tickIsHelpBlock = tickIsHelp ? tickIsHelp : this.tickIsHelp;
      this.readyTick.setAttribute(Attributes.ID, `${i + 1}`);

      const levelLine = this.createTagElement(
        TagNames.LIST_ITEM,
        [CssClasses.LEVEL_LINE],
        `Level ${levels[i].level}. ${levels[i].syntax}`
      );

      let resultsWithHelp =
        localStorage.getItem(Storage.RESULTS_WITH_HELP) || "";
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
        levelLine.classList.add(CssClasses.CURRENT_LEVEL_LINE);
      }

      let results = localStorage.getItem(Storage.RESULTS) || "";
      if (!results) {
        results = JSON.stringify(new Array(levels.length).fill(false));
      }
      if (results !== null) {
        const resultArr = JSON.parse(results);

        if (resultArr[i] === true) {
          readyTickBlock.classList.remove(CssClasses.LEVEL_NO_DONE);
          readyTickBlock.classList.add(CssClasses.LEVEL_DONE);
        }
        if (resultArr[i] === null) {
          readyTickBlock.classList.remove(CssClasses.LEVEL_DONE);
          readyTickBlock.classList.add(CssClasses.LEVEL_NO_DONE);
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
      const readyTick = document.querySelector(CssClasses.READY_TICK_DONE);
      readyTick?.classList.remove(CssClasses.READY_TICK_DONE);
      readyTick?.classList.add(CssClasses.READY_TICK_NO_DONE);
    });
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);

    element.classList.add(CssClasses.MENU, CssClasses.HIDE);
    return element;
  }
}
