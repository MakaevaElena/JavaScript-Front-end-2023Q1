import "./style.css";
import { EventName } from "../../enums/events/event-names";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
// import INotify from "../../observer/interfaces/i-notify";
// import Observer from "../../observer/observer";
import DefaultView from "../default-view";
import ObserverMethod from "../../observer/observer-method";
import { levels } from "../../../assets/data/data-levels";

type Level = {
  level: string;
  levelTitle: string;
  selectorName: string;
  doThis: string;
  selector: string;
  syntax: string;
  help: string;
  examples: string[];
  html: string;
};

// export default class HtmlViewerView extends DefaultView implements INotify {
export default class HtmlViewerView extends DefaultView {
  private readonly HEADER_TEXT = "HTML Viewer";
  htmlBlock = this.createTagElement("div", ["html-block"], "");

  levelNum = localStorage.getItem("savedLevel") || null;

  constructor(observer: ObserverMethod | null) {
    super();
    this.configureHtml();

    observer?.subscribe(EventName.TAG_SELECTED, this.selectHandler.bind(this));
    observer?.subscribe(
      EventName.TAG_UNSELECTED,
      this.unselectHandler.bind(this)
    );

    observer?.subscribe(
      EventName.LEVEL_SELECTED,
      this.selectHandler.bind(this)
    );
    observer?.subscribe(
      EventName.LEVEL_UNSELECTED,
      this.unselectHandler.bind(this)
    );

    this.htmlElement.addEventListener("mouseenter", () =>
      observer?.notify(EventName.HTML_SELECTED)
    );
    this.htmlElement.addEventListener("mouseout", () =>
      observer?.notify(EventName.HTML_UNSELECTED)
    );
  }

  private selectHandler<T>(param: T) {
    this.htmlElement.classList.add(CssClasses.SELECTED);
    if (typeof param === "string") {
      // this.htmlElement.textContent = param;
    }
  }
  private unselectHandler() {
    this.htmlElement.classList.remove(CssClasses.SELECTED);
    // this.htmlElement.textContent = "";
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

    // localStorage работает
    if (this.levelNum !== null) {
      this.renderHTMLCodeView(levels[+this.levelNum]);
      this.htmlElement.append(this.htmlBlock);
    }
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);
    element.classList.add(CssClasses.HTML_VIEWER);
    return element;
  }

  public renderHTMLCodeView(level: Level) {
    const htmlBlock = document.querySelector(".html-block");
    const block = htmlBlock ? htmlBlock : this.htmlBlock;

    block.innerHTML = "";

    level.html.split("\n").map((node) => {
      const row = this.createTagElement("div", ["row-code"], "");
      const pre = document.createElement("pre");
      pre.innerText = node;
      row.append(pre);
      block.append(row);
    });
  }
}
