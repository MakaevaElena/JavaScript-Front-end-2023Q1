import "./style.css";
import { EventName } from "../../enums/events/event-names";
import { CssClasses } from "../../enums/view/css-classes";
import { Attributes } from "../../enums/view/css-attributes";
import { TagNames } from "../../enums/view/tag-names";
import {
  START_LEVEL_NUMBER,
  HTML_VIEWER_HEADER_TEXT,
  HTML_VIEWER_FILE_NAME_TEXT,
} from "../../data/constants";
import { Storage } from "../../enums/storage-names";
import DefaultView from "../default-view";
import ObserverMethod from "../../observer/observer-method";
import { levels } from "../../data/data-levels";
import { Level } from "../../types/types";
import "highlight.js/styles/github.css";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
hljs.registerLanguage("xml", xml);

export default class HtmlViewerView extends DefaultView {
  private htmlBlock = this.createTagElement(
    TagNames.BLOCK,
    [CssClasses.HTML_BLOCK],
    ""
  );
  private levelNum =
    Number(localStorage.getItem(Storage.SAVED_LEVEL)) || START_LEVEL_NUMBER;
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
      const hljsTags = this.htmlElement.querySelectorAll(
        `.${CssClasses.HLJS_NAME}`
      );

      //TODO не выделяет вложенные тэги, хотя они с классом .hljs-name
      hljsTags.forEach((tag) => {
        if (tag.innerHTML === param) {
          if (tag instanceof HTMLElement) {
            tag.classList.add(CssClasses.SELECTED);
          }
        }
      });
    }
  }
  private codeUnselectHandler() {
    const hljsTags = this.htmlElement.querySelectorAll(
      `.${CssClasses.HLJS_NAME}`
    );
    hljsTags.forEach((tag) => {
      if (tag instanceof HTMLElement) {
        tag.classList.remove(CssClasses.SELECTED);
      }
    });
  }

  private configureHtml() {
    const htmlViewerHeader = this.createTagElement(
      TagNames.BLOCK,
      [CssClasses.HTML_VIEWER_HEADER],
      ""
    );

    const fileName = this.createTagElement(
      TagNames.BLOCK,
      [CssClasses.HTML_VIEWER_FILE_NAME],
      HTML_VIEWER_FILE_NAME_TEXT
    );
    const HtmlViewerTitle = this.createTagElement(
      TagNames.SECTION_LABEL,
      [CssClasses.HTML_VIEWER_TITLE],
      HTML_VIEWER_HEADER_TEXT
    );
    htmlViewerHeader.append(fileName, HtmlViewerTitle);

    const numberLinesBlock = this.createTagElement(
      TagNames.BLOCK,
      [CssClasses.HTML_NUMBER_LINES],
      ""
    );
    this.htmlElement.append(htmlViewerHeader, numberLinesBlock);

    const numberLines = this.createLineNumber();
    numberLinesBlock.append(numberLines);

    if (this.levelNum !== null) {
      this.renderHTMLCodeView(levels[+this.levelNum - 1]);
      this.htmlElement.append(this.htmlBlock);
    }
  }

  protected createHtml(): HTMLElement {
    const element = this.createTagElement(
      TagNames.SECTION,
      [CssClasses.HTML_VIEWER],
      ""
    );
    return element;
  }

  public renderHTMLCodeView(level: Level) {
    const htmlBlock = document.querySelector(`.${CssClasses.HTML_BLOCK}`);
    const block = htmlBlock ? htmlBlock : this.htmlBlock;

    block.innerHTML = "";

    level.html.split("\n").map((node) => {
      const row = this.createTagElement(
        TagNames.BLOCK,
        [CssClasses.HTML_ROW_CODE],
        ""
      );
      const pre = document.createElement(TagNames.PRE);

      const highlightedCode = hljs.highlight(node, { language: "xml" });
      pre.innerHTML = highlightedCode.value;
      row.append(pre);

      block.append(row);

      //TODO нет id вложенных тэгов
      // const hljsTags = pre.querySelectorAll(".hljs-tag");
      const hljsTags = pre.querySelectorAll(`.${CssClasses.HLJS_NAME}`);
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
    const elementClass = element.getAttribute(Attributes.CLASS)
      ? `.${element.getAttribute(Attributes.CLASS)}`
      : "";
    const elementId = element.getAttribute(Attributes.ID)
      ? `#${element.getAttribute(Attributes.ID)}`
      : "";
    return `${element.tagName.toLocaleLowerCase()} ${elementClass} ${elementId}></${element.tagName.toLocaleLowerCase()}`;
  }
}
