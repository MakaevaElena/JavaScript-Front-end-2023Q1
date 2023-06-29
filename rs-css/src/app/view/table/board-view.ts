import { CssClasses } from "./../../enums/view/css-classes";
// import { Level } from "./../../types/interfaces";
import "./style.css";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";
// import TagItemView from "./tag-item/tag-item-view";
import ObserverMethod from "../../observer/observer-method";
import { EventName } from "../../enums/events/event-names";
import { levels } from "../../data/data-levels";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
hljs.registerLanguage("xml", xml);

export default class BoardView extends DefaultView {
  private levelNum = Number(localStorage.getItem("savedLevel")) || 1;
  private table = this.createTagElement("div", ["table"], "");
  private taskTitle = this.createTagElement("div", ["title-task"], "");
  private tooltip = this.createTagElement("span", ["tooltip"], "");
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
          const selectedElementClass =
            event?.target.tagName.toLocaleLowerCase();
          observerMethod?.notify(
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
          el.classList.add("selected");
        }
      });
    }
  }

  private pictureUnelectHandler() {
    this.table.childNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        this.showTooltip(node);
        node.classList.remove("selected");

        if (node.hasChildNodes()) {
          node.childNodes.forEach((el) => {
            if (el instanceof HTMLElement) {
              el.classList.remove("selected");
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
    element.classList.add("board");

    return element;
  }

  public createTable(levelNum: number) {
    const table = document.querySelector(".table");
    const block = table ? table : this.table;
    block.innerHTML = levels[levelNum - 1].html;

    const animated = block.querySelectorAll(
      `.table ${levels[levelNum - 1].selector}`
    );
    if (animated !== null) {
      animated.forEach((el) => el.classList.add("animated-tag-item"));
    }

    const elements = block.querySelectorAll(".table *");
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
    const taskTitle = document.querySelector(".title-task");
    const block = taskTitle ? taskTitle : this.taskTitle;
    block.innerHTML = levels[levelNum - 1].task;
  }

  private showTooltip(element: HTMLElement) {
    let elementClass = element.getAttribute("class")
      ? `class=${element.getAttribute("class")}`
      : "";
    const elementId = element.getAttribute("id")
      ? `id=${element.getAttribute("id")}`
      : "";
    if (element.getAttribute("class")?.includes("animated-tag-item")) {
      elementClass = "";
    }
    const tooltipText = `<${element.tagName.toLocaleLowerCase()} ${elementClass} ${elementId}></${element.tagName.toLocaleLowerCase()}>`;
    this.tooltip.innerHTML = hljs.highlightAuto(tooltipText).value;
    this.htmlElement.append(this.tooltip);
    this.tooltip.classList.toggle("show");
    element.append(this.tooltip);
  }
}
