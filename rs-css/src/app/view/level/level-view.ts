import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";
import { EventName } from "../../enums/events/event-names";
import Observer from "../../observer/observer";

export default class LevelView extends DefaultView {
  constructor(observer: Observer) {
    super();

    this.htmlElement.addEventListener("mouseenter", () =>
      observer?.notify(EventName.LEVEL_SELECTED)
    );
    this.htmlElement.addEventListener("mouseout", () =>
      observer?.notify(EventName.LEVEL_UNSELECTED)
    );
  }
  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);
    element.classList.add(CssClasses.LEVEL);
    element.textContent = "LevelView";
    return element;
  }
}
