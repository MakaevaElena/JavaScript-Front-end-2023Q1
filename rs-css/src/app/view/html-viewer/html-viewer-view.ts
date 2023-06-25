import "./style.css";
import { EventName } from "../../enums/events/event-names";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
// import INotify from "../../observer/interfaces/i-notify";
// import Observer from "../../observer/observer";
import DefaultView from "../default-view";
import ObserverMethod from "../../observer/observer-method";
import { levels } from "../../data/data-levels";
import { Level } from "../../types/interfaces";

import "highlight.js/styles/github.css";
// import "@types/highlight.js";
// import "./paraiso-dark.min.css";

import hljs from "highlight.js/lib/core";
//!
// eslint-disable-next-line @typescript-eslint/no-var-requires
hljs.registerLanguage("xml", require("highlight.js/lib/languages/xml"));

// export default class HtmlViewerView extends DefaultView implements INotify {
export default class HtmlViewerView extends DefaultView {
  private readonly HEADER_TEXT = "HTML Viewer";
  private htmlBlock = this.createTagElement("div", ["html-block"], "");

  private levelNum = Number(localStorage.getItem("savedLevel")) || 1;

  constructor(observerMethod: ObserverMethod) {
    super();
    this.configureHtml();

    observerMethod?.subscribe(
      EventName.TAG_SELECTED,
      this.selectHandler.bind(this)
    );
    observerMethod?.subscribe(
      EventName.TAG_UNSELECTED,
      this.unselectHandler.bind(this)
    );
  }

  private selectHandler<T>(param: T) {
    console.log("param selectedElementClass", param);
    if (typeof param === "string") {
      const hljsTags = this.htmlElement.querySelectorAll(".hljs-name");
      // console.log(param);
      //! не выделяет вложенные тэги, хотя они с классом .hljs-name
      hljsTags.forEach((tag) => {
        if (tag.innerHTML === param) {
          if (tag instanceof HTMLElement) {
            // hljs.highlightElement(tag);
            tag.classList.add(CssClasses.SELECTED);
          }
        }
      });
    }
  }
  private unselectHandler() {
    const hljsTags = this.htmlElement.querySelectorAll(".hljs-name");
    hljsTags.forEach((tag) => {
      if (tag instanceof HTMLElement) {
        tag.classList.remove(CssClasses.SELECTED);
      }
    });
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
    numberLinesBlock.classList.add("html-number-lines");
    this.htmlElement.append(numberLinesBlock);

    const numberLines = this.createLineNumber();
    numberLinesBlock.append(numberLines);

    if (this.levelNum !== null) {
      this.renderHTMLCodeView(levels[+this.levelNum - 1]);
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

      const highlightedCode = hljs.highlight(node, { language: "xml" });
      // pre.innerText = highlightedCode;

      pre.innerHTML = highlightedCode.value;
      // hljs.highlightElement(row);
      row.append(pre);

      block.append(row);

      // const divBlock = htmlBlock?.querySelectorAll(".hljs-tag");
      // divBlock?.forEach((el) => hljs.highlightElement(el as HTMLElement));
    });
  }
}
