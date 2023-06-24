import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";
import { EventName } from "../../enums/events/event-names";
// import Observer from "../../observer/observer";
import ObserverMethod from "../../observer/observer-method";
import { levels } from "../../data/data-levels";
import HtmlViewerView from "../../view/html-viewer/html-viewer-view";
import BoardView from "../../view/table/board-view";
import CssViewerView from "../../view/css-viewer/css-viewer-view";
import MenuView from "../../view/menu-viewer/menu-view";

export default class LevelView extends DefaultView {
  private readonly TEXT = "LevelView";

  private levels = levels;
  // private level = levels[0];
  // private levelNum = +this.level.level;
  private levelHeader = this.createTagElement("div", ["level-header"], "");
  private levelNum = Number(localStorage.getItem("savedLevel")) || 0;
  private level = levels[this.levelNum - 1];
  private observerMethod = new ObserverMethod();
  private htmlViewerView = new HtmlViewerView(this.observerMethod);
  private boardView = new BoardView();
  private cssViewerView = new CssViewerView();
  private menuView = new MenuView();
  private menuViewElement = this.menuView.getHtmlElement();

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
    this.changeLevel();
    if (this.levelBlock) {
      this.levelBlock.innerHTML = "";
    }

    const levelHeader = document.querySelector(".level-header");
    const levelHeaderBlock = levelHeader ? levelHeader : this.levelHeader;
    levelHeaderBlock.innerHTML = "";
    const levelNumBlock = this.createTagElement("div", ["level-number"], "");
    levelNumBlock.textContent = `Level ${this.levelNum} of ${
      this.levels.length - 1
    }`;
    levelHeaderBlock.append(levelNumBlock);

    const readyButton = this.createTagElement("span", ["ready-button"], "");
    const prevRow = this.createTagElement("button", ["prev-row"], "");
    const nextRow = this.createTagElement("button", ["next-row"], "");

    levelHeaderBlock.append(readyButton, prevRow, nextRow);
    this.htmlElement.append(levelHeaderBlock);
    if (this.levelNum < levels.length - 1) {
      nextRow.addEventListener("click", () => this.goToNextLevel());
    }
    if (this.levelNum > 1) {
      prevRow.addEventListener("click", () => this.goToPrevLevel());
    }

    this.createBurger();
    this.renderLevelDescription();
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
      this.createTagElement("p", ["description"], this.level.description)
    );
    if (this.level.examples) {
      descriptionBlock.append(
        this.createTagElement("h3", ["examples"], "Examples")
      );
      this.level.examples.forEach((el) =>
        descriptionBlock.append(this.createTagElement("div", ["example"], el))
      );
    }
    this.htmlElement.append(descriptionBlock, this.menuViewElement);
  }

  private goToNextLevel() {
    this.levelNum += 1;
    this.saveLevelNumber(this.levelNum);
    this.level = levels[this.levelNum - 1];
    this.configureHtml();
    this.htmlViewerView.renderHTMLCodeView(this.level);
    this.boardView.createTitleTask(this.levelNum);
    this.boardView.createTable(this.levelNum);
    this.cssViewerView.createHelpButton();
    this.menuView.configureHtml(this.levelNum);
  }

  private goToPrevLevel() {
    this.levelNum -= 1;
    this.saveLevelNumber(this.levelNum);
    this.level = levels[this.levelNum - 1];
    this.configureHtml();
    this.htmlViewerView.renderHTMLCodeView(this.level);
    this.boardView.createTitleTask(this.levelNum);
    this.boardView.createTable(this.levelNum);
    this.cssViewerView.createHelpButton();
    this.menuView.configureHtml(this.levelNum);
  }

  //TODO в css-view добавить переход через submit/Enter
  public goToLevel(newLevel: number) {
    this.levelNum = newLevel;
    this.saveLevelNumber(this.levelNum);
    this.level = levels[this.levelNum - 1];
    this.configureHtml();
    this.htmlViewerView.renderHTMLCodeView(this.level);
    this.boardView.createTitleTask(this.levelNum);
    this.boardView.createTable(this.levelNum);
    this.cssViewerView.createHelpButton();
  }

  //! переход на уровень в листе
  private changeLevel() {
    const levelLines = document.querySelectorAll(".level-line");
    // console.log(levelLines);
    if (levelLines instanceof HTMLElement) {
      levelLines.forEach((levelLine) =>
        levelLine.addEventListener("click", () => {
          if (levelLine instanceof HTMLElement) {
            this.goToLevel(Number(levelLine.dataset.id));
          }
        })
      );
    }
  }

  public saveLevelNumber = (levelNum: number) => {
    const savedLevel = +levelNum;
    localStorage.setItem("savedLevel", JSON.stringify(savedLevel));
  };

  private createBurger() {
    const burger = this.createTagElement("div", ["hamburger"], "");
    const hamburgerLine = this.createTagElement("div", ["hamburger-line"], "");
    burger.append(hamburgerLine);

    const toggleMenu = () => {
      if (burger.classList.contains("opened")) {
        // this.menuViewElement.style.left = "100%";
        this.menuViewElement.style.opacity = "100%";
        burger.classList.remove("opened");
        burger.style.transform = "rotate(0deg)";
        document.body.style.overflow = "";
      } else {
        // this.menuViewElement.style.left = "0";
        this.menuViewElement.style.opacity = "0";
        burger.classList.add("opened");
        burger.style.transform = "rotate(90deg)";
        document.body.style.overflow = "hidden";
      }
    };

    burger.addEventListener("click", toggleMenu);
    // links.addEventListener("click", toggleMenu);
    this.levelHeader.append(burger);
    // this.htmlElement.append(this.menuViewElement);
  }
}
