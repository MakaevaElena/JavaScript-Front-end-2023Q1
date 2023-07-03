import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import { START_LEVEL_NUMBER, LEVEL_EXAMPLES_TITLE } from "../../data/constants";
import { Storage } from "../../enums/storage-names";
import DefaultView from "../default-view";
import ObserverMethod from "../../observer/observer-method";
import { EventName } from "../../enums/events/event-names";
import { levels } from "../../data/data-levels";
import HtmlViewerView from "../../view/html-viewer/html-viewer-view";
import BoardView from "../../view/table/board-view";
import CssViewerView from "../../view/css-viewer/css-viewer-view";
import MenuView from "../../view/menu-viewer/menu-view";

export default class LevelView extends DefaultView {
  private levels = levels;
  private levelHeader = this.createTagElement(
    TagNames.BLOCK,
    [CssClasses.LEVEL_HEADER],
    ""
  );
  private levelNum =
    Number(localStorage.getItem(Storage.SAVED_LEVEL)) || START_LEVEL_NUMBER;
  private level = levels[this.levelNum - 1];

  private menuView = new MenuView();
  private menuViewElement = this.menuView.getHtmlElement();
  private readyTick = this.createTagElement(
    TagNames.SPAN,
    [CssClasses.READY_TICK_NO_DONE],
    ""
  );

  private descriptionBlock = this.createTagElement(
    TagNames.BLOCK,
    [CssClasses.LEVEL_DESCRIPTION],
    ""
  );

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
    const levelSection = document.querySelector(`.${CssClasses.LEVEL}`);
    const levelSectionBlock = levelSection ? levelSection : this.levelBlock;
    if (levelSectionBlock instanceof HTMLElement) {
      levelSectionBlock.innerHTML = "";
    }

    const levelHeader = document.querySelector(`.${CssClasses.LEVEL_HEADER}`);
    const levelHeaderBlock = levelHeader ? levelHeader : this.levelHeader;
    levelHeaderBlock.innerHTML = "";
    const levelNumBlock = this.createTagElement(
      TagNames.BLOCK,
      [CssClasses.LEVEL_NUMBER],
      ""
    );
    levelNumBlock.textContent = `Level ${this.levelNum} of ${
      this.levels.length - 1
    }`;
    levelHeaderBlock.append(levelNumBlock);

    const prevRow = this.createTagElement(
      TagNames.BUTTON,
      [CssClasses.PREV_ROW],
      ""
    );
    const nextRow = this.createTagElement(
      TagNames.BUTTON,
      [CssClasses.NEXT_ROW],
      ""
    );

    let results = localStorage.getItem(Storage.RESULTS) || "";
    if (!results) {
      results = JSON.stringify(new Array(levels.length).fill(false));
    }
    if (results !== null) {
      const resultArr = JSON.parse(results);

      if (resultArr[this.levelNum - 1] === true) {
        this.readyTick.classList.remove(CssClasses.READY_TICK_NO_DONE);
        this.readyTick.classList.add(CssClasses.READY_TICK_DONE);
      }
      if (resultArr[this.levelNum - 1] === null) {
        this.readyTick.classList.remove(CssClasses.READY_TICK_DONE);
        this.readyTick.classList.add(CssClasses.READY_TICK_NO_DONE);
      }
    }

    levelHeaderBlock.append(this.readyTick, prevRow, nextRow);
    this.htmlElement.append(levelHeaderBlock);
    if (this.levelNum < levels.length) {
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
    this.descriptionBlock.innerHTML = "";
    this.descriptionBlock.append(
      this.createTagElement(
        TagNames.HEADER_SECOND,
        [CssClasses.LEVEL_SELECTOR_NAME],
        this.level.selectorName
      ),
      this.createTagElement(
        TagNames.HEADER_THIRD,
        [CssClasses.LEVEl_TITLE],
        this.level.levelTitle
      ),
      this.createTagElement(
        TagNames.HEADER_SECOND,
        [CssClasses.LEVEL_SINTAX],
        this.level.syntax
      ),
      this.createTagElement(
        TagNames.PARAGRATH,
        [CssClasses.LEVEL_TASK_DESCRIPTION],
        this.level.description
      )
    );
    if (this.level.examples) {
      this.descriptionBlock.append(
        this.createTagElement(
          TagNames.HEADER_THIRD,
          [CssClasses.LEVEL_EXAMPLES],
          LEVEL_EXAMPLES_TITLE
        )
      );
      this.level.examples.forEach((el) =>
        this.descriptionBlock.append(
          this.createTagElement(TagNames.BLOCK, [CssClasses.LEVEL_EXAMPLES], el)
        )
      );
    }
    this.htmlElement.append(this.descriptionBlock, this.menuViewElement);
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
    const burger = this.createTagElement(
      TagNames.BLOCK,
      [CssClasses.HUNBURGER, CssClasses.HUMBURGER_CLOSED],
      ""
    );
    const hamburgerLine = this.createTagElement(
      TagNames.BLOCK,
      [CssClasses.HUMBURGER_LINE],
      ""
    );
    burger.append(hamburgerLine);

    const toggleMenu = () => {
      if (burger.classList.contains(CssClasses.HUMBURGER_OPENED)) {
        this.descriptionBlock.classList.add(CssClasses.HIDE);
        this.descriptionBlock.classList.remove(CssClasses.SHOW);

        this.menuViewElement.classList.add(CssClasses.SHOW);
        this.menuViewElement.classList.remove(CssClasses.HIDE);
        burger.classList.remove(CssClasses.HUMBURGER_OPENED);
        burger.classList.add(CssClasses.HUMBURGER_CLOSED);
      } else {
        this.descriptionBlock.classList.remove(CssClasses.HIDE);
        this.descriptionBlock.classList.add(CssClasses.SHOW);

        this.menuViewElement.classList.remove(CssClasses.SHOW);
        this.menuViewElement.classList.add(CssClasses.HIDE);
        burger.classList.add(CssClasses.HUMBURGER_OPENED);
        burger.classList.remove(CssClasses.HUMBURGER_CLOSED);
      }
    };

    burger.addEventListener("click", toggleMenu);
    this.levelHeader.append(burger);
  }
}
