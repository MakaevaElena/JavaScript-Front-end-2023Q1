import "./style.css";
import { EventName } from "../../enums/events/event-names";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import INotify from "../../observer/interfaces/i-notify";
import Observer from "../../observer/observer";
import DefaultView from "../default-view";

export default class HtmlViewerView extends DefaultView implements INotify {
  private readonly HEADER_TEXT = "HTML Viewer";

  constructor(observer: Observer | null) {
    super();
    this.configureHtml();

    observer?.subscribe(EventName.TAG_SELECTED, this);
    observer?.subscribe(EventName.TAG_UNSELECTED, this);

    observer?.subscribe(EventName.LEVEL_SELECTED, this);
    observer?.subscribe(EventName.LEVEL_UNSELECTED, this);

    this.htmlElement.addEventListener("mouseenter", () =>
      observer?.notify(EventName.HTML_SELECTED)
    );
    this.htmlElement.addEventListener("mouseout", () =>
      observer?.notify(EventName.HTML_UNSELECTED)
    );
  }

  notify(nameEvent: EventName): void {
    switch (nameEvent) {
      case EventName.LEVEL_SELECTED:
      case EventName.TAG_SELECTED: {
        this.htmlElement.classList.add(CssClasses.SELECTED);
        break;
      }
      case EventName.LEVEL_UNSELECTED:
      case EventName.TAG_UNSELECTED: {
        this.htmlElement.classList.remove(CssClasses.SELECTED);
        break;
      }
    }
  }

  private configureHtml() {
    const htmlViewerHeader = document.createElement("div");
    htmlViewerHeader.classList.add("html-viewer-header");
    this.htmlElement.append(htmlViewerHeader);

    const fileName = document.createElement("div");
    fileName.classList.add("fileName");
    fileName.innerText = "table.html";
    htmlViewerHeader.append(fileName);

    const label = document.createElement(TagNames.SECTION_HEADER);
    label.classList.add("label");
    label.textContent = this.HEADER_TEXT;
    htmlViewerHeader.append(label);

    const numberLinesBlock = document.createElement("div");
    numberLinesBlock.classList.add("number-lines");
    this.htmlElement.append(numberLinesBlock);

    const numberLines = this.createLineNumber();
    numberLinesBlock.append(numberLines);
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);
    element.classList.add(CssClasses.HTML_VIEWER);

    return element;
  }
}
