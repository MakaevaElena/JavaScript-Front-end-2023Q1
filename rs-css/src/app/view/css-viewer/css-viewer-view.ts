import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";
import { levels } from "../../data/data-levels";

export default class CssViewerView extends DefaultView {
  private readonly HEADER_TEXT = "CSS Editor";
  private levelNum = Number(localStorage.getItem("savedLevel")) || 0;
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

    this.renderCssEditor(this.levelNum - 1);

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

  private renderCssEditor(level: number) {
    const cssEditor = this.createTagElement("form", ["css-editor"], "");
    const inputText: HTMLElement | null = this.createTagElement(
      "textarea",
      ["input-css-editor", "blink"],
      ""
    );
    if (inputText instanceof HTMLTextAreaElement) {
      inputText.placeholder = "Type in a CSS selector";
    }

    const buttonEditor: HTMLElement | null = this.createTagElement(
      "button",
      ["button-editor"],
      "Enter"
    );
    if (buttonEditor instanceof HTMLButtonElement) {
      buttonEditor.type = "submit";
    }

    const helpButton: HTMLElement | null = this.createTagElement(
      "button",
      ["button-help"],
      ""
    );
    if (helpButton instanceof HTMLButtonElement) {
      helpButton.innerText = "?";
      helpButton.addEventListener("click", (evt) => {
        inputText.classList.remove("blink");
        this.showAnswer(evt, level);
      });
    }

    cssEditor.append(inputText, buttonEditor, helpButton);
    this.htmlElement.append(cssEditor);
  }

  private showAnswer(event: Event, level: number) {
    event.preventDefault();
    const answer = levels[level].selector;
    // console.log(answer);
    this.printLetters(answer);
  }

  private printLetters(str: string) {
    const textarea = document.querySelector(".input-css-editor");
    if (textarea instanceof HTMLTextAreaElement) {
      if (str.length > 0) {
        textarea.innerHTML += str[0];
        setTimeout(() => this.printLetters(str.slice(1)), 500);
      }
    }
  }
}
