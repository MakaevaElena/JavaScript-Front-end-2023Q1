// import { Level } from "./../../types/interfaces";
import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
// import Observer from "../../observer/observer";
import DefaultView from "../default-view";
// import TagItemView from "./tag-item/tag-item-view";
// import ObserverMethod from "../../observer/observer-method";
import { levels } from "../../data/data-levels";

export default class BoardView extends DefaultView {
  private levelNum = Number(localStorage.getItem("savedLevel")) || 0;
  private table = this.createTagElement("div", ["table"], "");
  private taskTitle = this.createTagElement("div", ["title-task"], "");

  constructor() {
    super();
    this.htmlElement = this.createHtml();
    this.configureHtml();
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
    // levels[this.levelNum].html.forEach((el: HTMLElement) =>
    //   hljs.highlightBlock(el)
    // );

    // let tagItemItem = new TagItemView(observer);
    // tagItemItem.configureHtml("item_1", "cat-orange");
    // table.append(tagItemItem.getHtmlElement());
    // tagItemItem = new TagItemView(observer);
    // tagItemItem.configureHtml("item_2", "hat-blue");
    // table.append(tagItemItem.getHtmlElement());
    // tagItemItem = new TagItemView(observer);
    // tagItemItem.configureHtml("item_3", "dog-gray");
    // table.append(tagItemItem.getHtmlElement());
  }

  public createTitleTask(levelNum: number) {
    const taskTitle = document.querySelector(".title-task");
    const block = taskTitle ? taskTitle : this.taskTitle;
    block.innerHTML = levels[levelNum - 1].task;
  }
}
