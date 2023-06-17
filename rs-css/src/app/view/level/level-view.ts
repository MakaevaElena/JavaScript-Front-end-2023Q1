import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";
import { EventName } from "../../enums/events/event-names";
// import Observer from "../../observer/observer";
import ObserverMethod from "../../observer/observer-method";
import { levels } from "../../../assets/data/data-levels";

export default class LevelView extends DefaultView {
  private readonly TEXT = "LevelView";

  levels = levels;
  level = levels[4];
  levelNum = +this.level.level;

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
    element.textContent = "LevelView";
    return element;
  }

  private configureHtml() {
    const levelHeader = this.createTagElement("div", ["level-header"], "");
    const levelNumBlock = this.createTagElement("div", ["level-number"], "");
    levelNumBlock.textContent = `Level ${this.level.level} of ${this.levels.length}`;
    levelHeader.append(levelNumBlock);

    const readyButton = this.createTagElement("button", ["ready-button"], "");
    const prevRow = this.createTagElement("button", ["prev-row"], "");
    const nextRow = this.createTagElement("button", ["next-row"], "");
    levelHeader.append(readyButton, prevRow, nextRow);
    this.htmlElement.append(levelHeader);

    nextRow.addEventListener("click", () => this.goToNextLevel());
  }

  private goToNextLevel() {
    console.log(this.level.level);
    this.levelNum += 1;
    this.initLevel();
  }

  private initLevel() {
    const htmlViewer = document.querySelector(".html-viewer");

    const htmlBlock = this.createTagElement(
      "div",
      ["html-block"],
      "HTML BLOCK"
    );

    htmlBlock.innerText = "";

    htmlBlock.innerText = this.changeQuotes(this.level.html);

    htmlViewer?.append(htmlBlock);
  }

  private changeQuotes(str: string) {
    str.replace("<", "&lt");
    str.replace(">", "&gt");
    return str;
  }
}
