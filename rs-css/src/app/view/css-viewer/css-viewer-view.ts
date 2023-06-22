import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";
import { levels } from "../../data/data-levels";

export default class CssViewerView extends DefaultView {
  private readonly HEADER_TEXT = "CSS Editor";
  private levelNum = Number(localStorage.getItem("savedLevel")) || 0;
  private inputCssEditor: HTMLElement | null = this.createTagElement(
    "textarea",
    ["input-css-editor", "blink"],
    ""
  );
  private cssEditor: HTMLElement | null = this.createTagElement(
    "div",
    ["css-editor"],
    ""
  );

  private buttonHelp: HTMLElement | null = this.createTagElement(
    "button",
    ["button-help"],
    ""
  );

  private submitButton: HTMLElement | null = this.createTagElement(
    "button",
    ["submit-button"],
    "Enter"
  );

  constructor() {
    super();
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
    this.createSubmitButton();
    this.createHelpButton();
    if (
      this.cssEditor instanceof HTMLElement &&
      this.inputCssEditor instanceof HTMLTextAreaElement &&
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
    }
  }

  //TODO проверка ответа
  private createSubmitButton() {
    if (this.submitButton instanceof HTMLButtonElement) {
      this.submitButton.type = "submit";
      this.submitButton.addEventListener("click", () => {
        if (
          this.inputCssEditor?.innerHTML === levels[this.levelNum - 1].selector
        ) {
          console.log("right");
        } else
          console.log("wrong, answer: ", levels[this.levelNum - 1].selector);
        this.inputCssEditor?.classList.add("shake");
      });
    }
  }

  public createHelpButton() {
    const inputCssEditor = document.querySelector(".input-css-editor");
    const block = inputCssEditor ? inputCssEditor : this.inputCssEditor;
    if (block instanceof HTMLTextAreaElement) {
      block.innerHTML = "";
    }
    if (this.buttonHelp instanceof HTMLButtonElement) {
      this.buttonHelp.innerText = "?";

      this.buttonHelp.addEventListener("click", (event) => {
        event.preventDefault();

        const level = Number(localStorage.getItem("savedLevel")) || 0;
        const answer = levels[level - 1].selector;

        if (this.inputCssEditor instanceof HTMLTextAreaElement) {
          this.inputCssEditor.innerHTML = "";
          this.inputCssEditor.classList.remove("blink");
        }
        this.printLetters(answer);
      });
    }
  }

  private printLetters(str: string) {
    const inputCssEditor = document.querySelector(".input-css-editor");
    const blockInput = inputCssEditor ? inputCssEditor : this.inputCssEditor;

    if (blockInput instanceof HTMLTextAreaElement) {
      if (str.length > 0) {
        blockInput.innerHTML += str[0];
        setTimeout(() => this.printLetters(str.slice(1)), 500);
      }
    }
  }
}
