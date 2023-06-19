import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";
import { EventName } from "../../enums/events/event-names";
// import Observer from "../../observer/observer";
import ObserverMethod from "../../observer/observer-method";
import { levels } from "../../../assets/data/data-levels";
// import HtmlViewerView from "../../view/html-viewer/html-viewer-view";

export default class LevelView extends DefaultView {
  private readonly TEXT = "LevelView";

  levels = levels;
  level = levels[0];
  levelNum = +this.level.level;
  // levelNum = +localStorage.getItem(savedLevel);

  htmlBlock = this.createTagElement("div", ["html-block"], "");
  levelBlock!: HTMLElement | null;

  constructor(observer: ObserverMethod) {
    super();
    this.configureHtml();

    this.htmlElement.addEventListener("mouseenter", () =>
      observer?.notify(EventName.LEVEL_SELECTED, this.TEXT)
    );
    this.htmlElement.addEventListener("mouseout", () =>
      observer?.notify(EventName.LEVEL_UNSELECTED, this.TEXT)
    );
  }
  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);
    element.classList.add(CssClasses.LEVEL);
    this.levelBlock = element;
    return element;
  }

  private configureHtml() {
    if (this.levelBlock) {
      this.levelBlock.innerHTML = "";
    }
    const levelHeader = this.createTagElement("div", ["level-header"], "");
    const levelNumBlock = this.createTagElement("div", ["level-number"], "");
    levelNumBlock.textContent = `Level ${this.levelNum} of ${
      this.levels.length - 1
    }`;
    levelHeader.append(levelNumBlock);

    const readyButton = this.createTagElement("button", ["ready-button"], "");
    const prevRow = this.createTagElement("button", ["prev-row"], "");
    const nextRow = this.createTagElement("button", ["next-row"], "");

    levelHeader.append(readyButton, prevRow, nextRow);
    this.htmlElement.append(levelHeader);
    if (this.levelNum < levels.length - 1) {
      nextRow.addEventListener("click", () => this.goToNextLevel());
    }
    if (this.levelNum > 1) {
      prevRow.addEventListener("click", () => this.goToPrevLevel());
    }

    this.renderLevelDescription();
    this.renderHTMLCodeView();
  }

  private renderLevelDescription() {
    const descriptionBlock = this.createTagElement(
      "div",
      ["level-decsription"],
      ""
    );
    descriptionBlock.innerHTML = "";
    descriptionBlock.append(
      this.createTagElement("h2", ["selector-name"], this.level.selectorName),
      this.createTagElement("h3", ["title"], this.level.levelTitle),
      this.createTagElement("h2", ["syntax"], this.level.syntax),
      this.createTagElement("p", ["description"], this.level.help)
    );
    if (this.level.examples) {
      descriptionBlock.append(
        this.createTagElement("h3", ["examples"], "Examples")
      );
      this.level.examples.forEach((el) =>
        descriptionBlock.append(this.createTagElement("div", ["example"], el))
      );
    }
    this.htmlElement.append(descriptionBlock);
  }

  private goToNextLevel() {
    this.levelNum += 1;
    this.level = levels[this.levelNum];
    this.configureHtml();
    this.renderHTMLCodeView();
  }

  private goToPrevLevel() {
    this.levelNum -= 1;
    this.level = levels[this.levelNum];
    this.configureHtml();
    this.renderHTMLCodeView();
  }

  private renderHTMLCodeView() {
    this.htmlBlock.innerHTML = "";
    const htmlViewer = document.querySelector(".html-viewer");

    this.level.html.split("\n").map((node) => {
      const row = this.createTagElement("div", ["row-code"], "");
      const pre = document.createElement("pre");
      pre.innerText = node;
      row.append(pre);
      this.htmlBlock.append(row);
    });

    htmlViewer?.append(this.htmlBlock);
  }

  // private changeQuotes(str: string) {
  //   str.replace("<", "&lt");
  //   str.replace(">", "&gt");
  //   return str;
  // }

  saveLevelNumber = (levelNum: number) => {
    const savedLevel = ++levelNum;
    localStorage.setItem("savedLevel", JSON.stringify(savedLevel));
  };
}
