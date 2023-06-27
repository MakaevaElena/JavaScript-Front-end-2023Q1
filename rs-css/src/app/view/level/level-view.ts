import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";
import ObserverMethod from "../../observer/observer-method";
import { EventName } from "../../enums/events/event-names";
import { levels } from "../../data/data-levels";
import HtmlViewerView from "../../view/html-viewer/html-viewer-view";
import BoardView from "../../view/table/board-view";
import CssViewerView from "../../view/css-viewer/css-viewer-view";
import MenuView from "../../view/menu-viewer/menu-view";

export default class LevelView extends DefaultView {
  private readonly TEXT = "LevelView";
  private levels = levels;
  private levelHeader = this.createTagElement("div", ["level-header"], "");
  private levelNum = Number(localStorage.getItem("savedLevel")) || 1;
  private level = levels[this.levelNum - 1];
  // private observerMethod = new ObserverMethod();

  private menuView = new MenuView();
  private menuViewElement = this.menuView.getHtmlElement();
  private readyButton = this.createTagElement(
    "span",
    ["ready-button-no-done"],
    ""
  );
  // private htmlBlock = this.createTagElement("div", ["html-block"], "");
  levelBlock!: HTMLElement | null;
  private observerMethod;
  private htmlViewerView;
  private boardView;
  private cssViewerView;

  constructor(observerMethod: ObserverMethod) {
    super();
    this.observerMethod = observerMethod;
    this.htmlViewerView = new HtmlViewerView(this.observerMethod);
    this.boardView = new BoardView(this.observerMethod);
    this.cssViewerView = new CssViewerView(this.observerMethod);

    observerMethod?.subscribe(
      EventName.CORRECT_ANSWER,
      this.correctAnswerHandler.bind(this)
    );
    this.configureHtml();
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);
    element.classList.add(CssClasses.LEVEL);
    this.levelBlock = element;
    return element;
  }

  private configureHtml() {
    const levelSection = document.querySelector(".level");
    const levelSectionBlock = levelSection ? levelSection : this.levelBlock;
    if (levelSectionBlock instanceof HTMLElement) {
      levelSectionBlock.innerHTML = "";
    }

    const levelHeader = document.querySelector(".level-header");
    const levelHeaderBlock = levelHeader ? levelHeader : this.levelHeader;
    levelHeaderBlock.innerHTML = "";
    const levelNumBlock = this.createTagElement("div", ["level-number"], "");
    levelNumBlock.textContent = `Level ${this.levelNum} of ${
      this.levels.length - 1
    }`;
    levelHeaderBlock.append(levelNumBlock);

    // const readyButton = this.createTagElement("span", ["ready-button-no-done"], "");
    const prevRow = this.createTagElement("button", ["prev-row"], "");
    const nextRow = this.createTagElement("button", ["next-row"], "");

    let results = localStorage.getItem("results") || "";
    if (!results) {
      results = JSON.stringify(new Array(levels.length).fill(false));
    }
    if (results !== null) {
      const resultArr = JSON.parse(results);

      if (resultArr[this.levelNum - 1] === true) {
        this.readyButton.classList.remove("ready-button-no-done");
        this.readyButton.classList.add("ready-button-done");
      }
      if (resultArr[this.levelNum - 1] === null) {
        this.readyButton.classList.remove("ready-button-done");
        this.readyButton.classList.add("ready-button-no-done");
      }
    }

    levelHeaderBlock.append(this.readyButton, prevRow, nextRow);
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

  private correctAnswerHandler<T>(param: T) {
    const level: number = +param;
    this.saveResult(level - 1, true);
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

  public goToNextLevel() {
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

  private createBurger() {
    const burger = this.createTagElement("div", ["hamburger"], "");
    const hamburgerLine = this.createTagElement("div", ["hamburger-line"], "");
    burger.append(hamburgerLine);

    const toggleMenu = () => {
      if (burger.classList.contains("opened")) {
        this.menuViewElement.style.opacity = "100%";
        burger.classList.remove("opened");
        burger.style.transform = "rotate(0deg)";
        document.body.style.overflow = "";
      } else {
        this.menuViewElement.style.opacity = "0";
        burger.classList.add("opened");
        burger.style.transform = "rotate(90deg)";
        document.body.style.overflow = "hidden";
      }
    };

    burger.addEventListener("click", toggleMenu);
    this.levelHeader.append(burger);
  }
}
