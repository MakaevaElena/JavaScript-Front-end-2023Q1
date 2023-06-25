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
//!
// eslint-disable-next-line @typescript-eslint/no-var-requires
hljs.registerLanguage("xml", require("highlight.js/lib/languages/xml"));

export default class BoardView extends DefaultView {
  private levelNum = Number(localStorage.getItem("savedLevel")) || 1;
  private table = this.createTagElement("div", ["table"], "");
  private taskTitle = this.createTagElement("div", ["title-task"], "");
  private tooltip = this.createTagElement("span", ["tooltip"], "");

  constructor(observerMethod: ObserverMethod) {
    super();
    this.htmlElement = this.createHtml();
    this.configureHtml();

    this.table.childNodes.forEach((node) => {
      node.addEventListener("mouseenter", (event) => {
        if (event.target instanceof HTMLElement) {
          const selectedElementClass =
            event?.target.tagName.toLocaleLowerCase();
          observerMethod?.notify(EventName.TAG_SELECTED, selectedElementClass);
        }

        console.log("notify mouseenter");
      });
    });

    // this.htmlElement.addEventListener("mouseenter", (event) => {
    //   if (event.target instanceof HTMLElement) {
    //     const selectedElementClass = event?.target.getAttribute("class");
    //     observerMethod?.notify(EventName.TAG_SELECTED, selectedElementClass);
    //   }

    //   console.log("notify mouseenter");
    // });
    this.htmlElement.addEventListener("mouseout", () => {
      observerMethod?.notify(EventName.TAG_UNSELECTED);
      console.log("notify mouseout");
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

  // private createTable<T>(param: T) {
  // let observer: ObserverMethod | null = null;
  // if (param instanceof ObserverMethod) {
  // observer = param;
  // }
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

    // elements.forEach((element) => {
    //   const selector = element.getAttribute("class");

    //   element.addEventListener("mouseenter", () => {
    //     this.observerMethod?.notify(EventName.TAG_SELECTED, selector);
    //   });

    //   element.addEventListener("mouseout", () => {
    //     this.observerMethod?.notify(EventName.TAG_UNSELECTED, selector);
    //   });
    // });
  }

  public createTitleTask(levelNum: number) {
    const taskTitle = document.querySelector(".title-task");
    const block = taskTitle ? taskTitle : this.taskTitle;
    block.innerHTML = levels[levelNum - 1].task;
  }

  //! при смене уровня зависает
  // не видит вложенные элементы
  // tooltip не исчезает при mouseout/leave
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
    this.tooltip.style.left = `${element.getClientRects()[0].left - 200}px`;
    this.tooltip.style.top = `${element.getClientRects()[0].top - 50}px`;
    this.htmlElement.append(this.tooltip);
    this.tooltip.classList.toggle("hidden");
  }
}
