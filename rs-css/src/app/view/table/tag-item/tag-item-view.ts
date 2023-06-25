import "./style.css";
// import { EventName } from "../../../enums/events/event-names";
import DefaultView from "../../default-view";
import { CssClasses } from "../../../enums/view/css-classes";
import { TagNames } from "../../../enums/view/tag-names";
// import ObserverMethod from "../../../observer/observer-method";

// export default class TagItemView extends DefaultView implements INotify {
export default class TagItemView extends DefaultView {
  private currentTag = "0";

  constructor() {
    super();
  }

  // private selectHandler<T>(param: T) {
  //   this.htmlElement.classList.add(CssClasses.SELECTED);
  //   if (typeof param === "string") {
  //     this.htmlElement.textContent = param;
  //   }
  // }
  // private unselectHandler() {
  //   this.htmlElement.classList.remove(CssClasses.SELECTED);
  // }

  public configureHtml(...classes: string[]) {
    this.htmlElement.classList.add(...classes);
  }

  createHtml(): HTMLElement {
    const element = document.createElement(TagNames.TABLE_ITEM);
    element.classList.add(CssClasses.TABLE_ITEM);
    return element;
  }
}
