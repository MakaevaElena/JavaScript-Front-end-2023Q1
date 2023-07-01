import "./style.css";
import { START_LEVEL_NUMBER } from "../../data/constants";
import { CssClasses } from "./../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import { Attributes } from "../../enums/view/css-attributes";
import DefaultView from "../default-view";
import ObserverMethod from "../../observer/observer-method";
import { EventName } from "../../enums/events/event-names";
import { levels } from "../../data/data-levels";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
hljs.registerLanguage("xml", xml);

export default class BoardView extends DefaultView {
  private levelNum =
    Number(localStorage.getItem("savedLevel")) || START_LEVEL_NUMBER;
  private table = this.createTagElement(TagNames.BLOCK, [CssClasses.TABLE], "");
  private taskTitle = this.createTagElement(
    TagNames.BLOCK,
    [CssClasses.TITLE_TASK],
    ""
  );
  private tooltip = this.createTagElement(
    TagNames.SPAN,
    [CssClasses.TOOLTIP],
    ""
  );
  private observerMethod;

  constructor(observerMethod: ObserverMethod) {
    super();
    this.observerMethod = observerMethod;
    this.htmlElement = this.createHtml();
    this.configureHtml();

    observerMethod?.subscribe(
      EventName.CODE_SELECTED,
      this.pictureSelectHandler.bind(this)
    );
    observerMethod?.subscribe(
      EventName.CODE_UNSELECTED,
      this.pictureUnelectHandler.bind(this)
    );

    this.table.childNodes.forEach((node) => {
      node.addEventListener("mouseenter", (event) => {
        if (event.target instanceof HTMLElement) {
          const selectedElementClass = event.target.tagName.toLocaleLowerCase();
          observerMethod.notify(
            EventName.PICTURE_SELECTED,
            selectedElementClass
          );
        }
      });
    });

    this.htmlElement.addEventListener("mouseout", () => {
      observerMethod?.notify(EventName.PICTURE_UNSELECTED);
    });
  }

  private pictureSelectHandler<T>(param: T) {
    if (param instanceof HTMLElement) {
      const selected = this.table.querySelectorAll(`${param.innerHTML}`);
      console.log(selected);
      selected.forEach((el) => {
        if (el instanceof HTMLElement) {
          this.showTooltip(el);
          el.classList.add(CssClasses.SELECTED);
        }
      });
    }
  }

  private pictureUnelectHandler() {
    this.table.childNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        this.showTooltip(node);
        node.classList.remove(CssClasses.SELECTED);

        if (node.hasChildNodes()) {
          node.childNodes.forEach((el) => {
            if (el instanceof HTMLElement) {
              el.classList.remove(CssClasses.SELECTED);
            }
          });
        }
      }
    });
  }

  private configureHtml() {
    if (this.levelNum !== null) {
      this.createTitleTask(this.levelNum);
      this.createTable(this.levelNum);
      this.htmlElement.append(this.taskTitle, this.table);
    }
  }

  protected createHtml() {
    const element = document.createElement(TagNames.SECTION);
    element.classList.add(CssClasses.BOARD);

    return element;
  }

  public createTable(levelNum: number) {
    const table = document.querySelector(`.${CssClasses.TABLE}`);
    const block = table ? table : this.table;
    block.innerHTML = levels[levelNum - 1].html;

    const animated = block.querySelectorAll(
      `.table ${levels[levelNum - 1].selector}`
    );
    if (animated !== null) {
      animated.forEach((el) => el.classList.add(CssClasses.ANIMATED_TAG_ITEM));
    }

    const elements = block.querySelectorAll(`.${CssClasses.TABLE} *`);
    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.addEventListener("mouseenter", () => {
          this.showTooltip(element);
        });
        element.addEventListener("mouseleave", () => {
          this.showTooltip(element);
        });
      }
    });
  }

  public createTitleTask(levelNum: number) {
    const taskTitle = document.querySelector(`.${CssClasses.TITLE_TASK}`);
    const block = taskTitle ? taskTitle : this.taskTitle;
    block.innerHTML = levels[levelNum - 1].task;
  }

  private showTooltip(element: HTMLElement) {
    let elementClass = element.getAttribute(Attributes.CLASS)
      ? `class=${element.getAttribute(Attributes.CLASS)}`
      : "";
    const elementId = element.getAttribute("id")
      ? `id=${element.getAttribute(Attributes.ID)}`
      : "";
    if (
      element
        .getAttribute(Attributes.CLASS)
        ?.includes(CssClasses.ANIMATED_TAG_ITEM)
    ) {
      elementClass = "";
    }
    const tooltipText = `<${element.tagName.toLocaleLowerCase()} ${elementClass} ${elementId}></${element.tagName.toLocaleLowerCase()}>`;
    this.tooltip.innerHTML = hljs.highlightAuto(tooltipText).value;
    this.htmlElement.append(this.tooltip);
    this.tooltip.classList.toggle(CssClasses.SHOW);
    element.append(this.tooltip);
  }
}
