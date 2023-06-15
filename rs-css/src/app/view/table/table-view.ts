import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import Observer from "../../observer/observer";
import DefaultView from "../default-view";
import TagItemView from "./tag-item/tag-item-view";

export default class TableView extends DefaultView {
  constructor(observer: Observer) {
    super();
    this.htmlElement = this.createHtml(observer);
  }

  protected createHtml<T>(param: T): HTMLElement {
    let observer: Observer | null = null;
    if (param instanceof Observer) {
      observer = param;
    }
    const element = document.createElement(TagNames.SECTION);
    element.classList.add(CssClasses.TABLE);
    element.classList.add("mat");

    let tagItemItem = new TagItemView(observer);
    tagItemItem.configureHtml("cat-orange", "selected-element");
    element.append(tagItemItem.getHtmlElement());
    tagItemItem = new TagItemView(observer);
    tagItemItem.configureHtml("cat-black");
    element.append(tagItemItem.getHtmlElement());
    tagItemItem = new TagItemView(observer);
    tagItemItem.configureHtml("cat-gray");
    element.append(tagItemItem.getHtmlElement());

    return element;
  }
}
