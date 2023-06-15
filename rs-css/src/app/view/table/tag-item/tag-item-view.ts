import "./style.css";
import { EventName } from "../../../enums/events/event-names";
import INotify from "../../../observer/interfaces/i-notify";
import Observer from "../../../observer/observer";
import DefaultView from "../../default-view";
import { CssClasses } from "../../../enums/view/css-classes";
import { TagNames } from "../../../enums/view/tag-names";

export default class TagItemView extends DefaultView implements INotify {
  private currentTag = "0";

  constructor(observer: Observer | null) {
    super();

    observer?.subscribe(EventName.HTML_SELECTED, this);
    observer?.subscribe(EventName.HTML_UNSELECTED, this);

    observer?.subscribe(EventName.LEVEL_SELECTED, this);
    observer?.subscribe(EventName.LEVEL_UNSELECTED, this);

    this.htmlElement.addEventListener("mouseenter", () =>
      observer?.notify(EventName.TAG_SELECTED)
    );
    this.htmlElement.addEventListener("mouseout", () =>
      observer?.notify(EventName.TAG_UNSELECTED)
    );
  }

  notify(nameEvent: EventName): void {
    switch (nameEvent) {
      case EventName.HTML_SELECTED:
      case EventName.LEVEL_SELECTED: {
        this.htmlElement.classList.add(CssClasses.SELECTED);
        break;
      }
      case EventName.HTML_UNSELECTED:
      case EventName.LEVEL_UNSELECTED: {
        this.htmlElement.classList.remove(CssClasses.SELECTED);
        break;
      }
    }
  }

  public configureHtml(...classes: string[]) {
    this.htmlElement.classList.add(...classes);
  }

  createHtml(): HTMLElement {
    const element = document.createElement(TagNames.TABLE_ITEM);
    element.classList.add(CssClasses.TABLE_ITEM);
    return element;
  }
}
