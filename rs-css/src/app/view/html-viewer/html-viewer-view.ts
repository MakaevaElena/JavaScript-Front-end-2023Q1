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
  private observerMethod;

  constructor(observerMethod: ObserverMethod) {
    super();
    this.observerMethod = observerMethod;
    this.configureHtml();

    observerMethod?.subscribe(
      EventName.PICTURE_SELECTED,
      this.codeSelectHandler.bind(this)
    );
    observerMethod?.subscribe(
      EventName.PICTURE_UNSELECTED,
      this.codeUnselectHandler.bind(this)
    );
  }

  private codeSelectHandler<T>(param: T) {
    if (typeof param === "string") {
      const hljsTags = this.htmlElement.querySelectorAll(".hljs-name");
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
  private codeUnselectHandler() {
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

      //! нет id вложенных тэгов
      // const hljsTags = pre.querySelectorAll(".hljs-tag");
      const hljsTags = pre.querySelectorAll(".hljs-name");
      hljsTags.forEach((element) => {
        // console.log("hljs-tag", element);

        // const tag = element.querySelector(".hljs-name")?.innerHTML || "";
        // const attributeName =
        //   element.querySelector(".hljs-attr")?.innerHTML || "";
        // const id = element.querySelector(".hljs-string")?.innerHTML || "";
        // const className =
        //   element.querySelector(".hljs-string")?.innerHTML || "";

        element.addEventListener("mouseenter", () => {
          this.observerMethod.notify(
            EventName.CODE_SELECTED,
            element
            // `${tag} ${className ? "#" : ""}${className} ${id ? "." : ""}${id} `
            // `${tag}`
          );
          // console.log("notify CODE_SELECTED");
        });
      });

      pre.addEventListener("mouseout", () => {
        // console.log("notify CODE_UNSELECTED");
        this.observerMethod.notify(EventName.CODE_UNSELECTED);
      });
    });
  }

  private getElementSElectors(element: HTMLElement) {
    const elementClass = element.getAttribute("class")
      ? `.${element.getAttribute("class")}`
      : "";
    const elementId = element.getAttribute("id")
      ? `#${element.getAttribute("id")}`
      : "";
    return `${element.tagName.toLocaleLowerCase()} ${elementClass} ${elementId}></${element.tagName.toLocaleLowerCase()}`;
  }
}
