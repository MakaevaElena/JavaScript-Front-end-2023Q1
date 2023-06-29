import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";
import { levels } from "../../data/data-levels";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import ObserverMethod from "../../observer/observer-method";
import { EventName } from "../../enums/events/event-names";
// import { HTMLElementTagNameMap } from "../../types/interfaces";
hljs.registerLanguage("xml", xml);

export default class CssViewerView extends DefaultView {
  private readonly HEADER_TEXT = "CSS Editor";
  private levelNum = Number(localStorage.getItem("savedLevel")) || 1;
  private observerMethod;
  private inputCssEditor = this.createTagElement(
    "input",
    ["input-css-editor", "blink"],
    ""
  );
  private cssEditor = this.createTagElement("div", ["css-editor"], "");

  private buttonHelp = this.createTagElement("button", ["button-help"], "");

  private submitButton = this.createTagElement(
    "button",
    ["submit-button"],
    "Enter"
  );

  constructor(observerMethod: ObserverMethod) {
    super();
    this.observerMethod = observerMethod;
    this.configureHtml();
  }

  private configureHtml() {
    const cssViewerHeader = document.createElement("div");
    cssViewerHeader.classList.add("css-viewer-header");
    this.htmlElement.append(cssViewerHeader);

    const fileName = document.createElement("div");
    fileName.classList.add("fileName");
    fileName.innerText = "style.css";
    cssViewerHeader.append(fileName);

    const label = document.createElement(TagNames.SECTION_HEADER);
    label.classList.add("label");
    label.textContent = this.HEADER_TEXT;
    cssViewerHeader.append(label);

    const numberLinesBlock = document.createElement("div");
    numberLinesBlock.classList.add("css-number-lines");
    this.htmlElement.append(numberLinesBlock);

    const numberLines = this.createLineNumber();
    numberLinesBlock.append(numberLines);

    this.renderCssEditor();

    const comments = this.createTagElement(
      "div",
      ["comments"],
      `<pre>
    /* Styles would go here. */
    }
    
    /*
    Type a number to skip to a level.
    Ex → "5" for level 5
    */
    </pre>`
    );

    this.htmlElement.append(comments);
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);
    element.classList.add(CssClasses.CSS_VIEWER);

    return element;
  }

  private renderCssEditor() {
    this.createHelpButton();
    if (
      this.cssEditor instanceof HTMLElement &&
      this.inputCssEditor instanceof HTMLInputElement &&
      this.submitButton instanceof Node &&
      this.buttonHelp instanceof Node
    ) {
      this.inputCssEditor.placeholder = "Type in a CSS selector";

      this.cssEditor.append(
        this.inputCssEditor,
        this.submitButton,
        this.buttonHelp
      );
      this.htmlElement.append(this.cssEditor);
      this.createSubmitButton();
      this.inputCssEditor.addEventListener("input", () => {
        this.inputCssEditor?.classList.remove("css-right");
        this.inputCssEditor?.classList.remove("shake");
      });
      this.inputCssEditor.addEventListener("focus", () => {
        this.inputCssEditor?.classList.remove("shake");
      });
    }
  }

  public createSubmitButton() {
    if (this.submitButton instanceof HTMLButtonElement) {
      this.submitButton.type = "submit";

      const submit = () => {
        const level = Number(localStorage.getItem("savedLevel")) || 1;
        if (this.inputCssEditor instanceof HTMLInputElement) {
          if (this.inputCssEditor?.value === levels[level - 1].selector) {
            if (level === 18) this.saveLevelNumber(1);
            this.saveLevelNumber(level + 1);
            window.location.reload();
            this.inputCssEditor.classList.add("css-right-blink", "css-right");
          } else {
            this.inputCssEditor?.classList.add("shake");
          }
        }

        this.observerMethod.notify(EventName.CORRECT_ANSWER, level.toString());
      };
      this.submitButton.addEventListener("click", () => submit());

      //TODO не срабатывает Enter
      this.inputCssEditor.addEventListener("keydown", (event) => {
        if (event.keyCode === 13 || event.key === "Enter") {
          event.preventDefault();
          submit();
        }
      });
    }
  }

  public createHelpButton() {
    const inputCssEditor = document.querySelector(".input-css-editor");
    const block = inputCssEditor ? inputCssEditor : this.inputCssEditor;
    if (block instanceof HTMLInputElement) {
      block.innerHTML = "";
    }
    if (this.buttonHelp instanceof HTMLButtonElement) {
      this.buttonHelp.innerText = "?";

      this.buttonHelp.addEventListener("click", (event) => {
        event.preventDefault();

        const level = Number(localStorage.getItem("savedLevel")) || 1;
        const answer = levels[level - 1].selector;

        if (this.inputCssEditor instanceof HTMLInputElement) {
          this.inputCssEditor.value = "";
          this.inputCssEditor.classList.remove("blink");
        }
        this.printLetters(answer);
      });
    }
  }

  private printLetters(str: string) {
    const inputCssEditor = document.querySelector(".input-css-editor");
    const blockInput = inputCssEditor ? inputCssEditor : this.inputCssEditor;

    if (blockInput instanceof HTMLInputElement) {
      if (str.length > 0) {
        blockInput.value += str[0];
        setTimeout(() => this.printLetters(str.slice(1)), 200);
      }
    }
  }
}
