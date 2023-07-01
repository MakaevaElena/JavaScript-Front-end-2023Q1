import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { Storage } from "../../enums/storage-names";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";
import { levels } from "../../data/data-levels";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github.css";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import ObserverMethod from "../../observer/observer-method";
import { EventName } from "../../enums/events/event-names";
import {
  START_LEVEL_NUMBER,
  FINISH_LEVEL_NUMBER,
  CSS_VIEWER_TITLE_TEXT,
  CSS_VIEWER_FILE_NAME_TEXT,
  BUTTON_SUBMIT_TEXT,
  CSS_COMMENTS_TEXT,
  CSS_INPUT_PLACEHOLDER_TEXT,
  LETTERS_PRINT_TIME,
} from "../../data/constants";

hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);

export default class CssViewerView extends DefaultView {
  private observerMethod;
  private inputCssEditor = this.createTagElement(
    TagNames.INPUT,
    [CssClasses.INPUT_CSS_EDITOR, CssClasses.CSS_RIGHT_BLINCK],
    ""
  );
  private cssEditor = this.createTagElement(
    TagNames.BLOCK,
    [CssClasses.CSS_EDITOR],
    ""
  );

  private buttonHelp = this.createTagElement(
    TagNames.BUTTON,
    [CssClasses.BUTTON_HELP],
    ""
  );

  private submitButton = this.createTagElement(
    TagNames.BUTTON,
    [CssClasses.BUTTON_SUBMIT],
    BUTTON_SUBMIT_TEXT
  );

  constructor(observerMethod: ObserverMethod) {
    super();
    this.observerMethod = observerMethod;
    this.configureHtml();
  }

  private configureHtml() {
    const cssViewerHeader = this.createTagElement(
      TagNames.BLOCK,
      [CssClasses.CSS_VIEWER_HEADER],
      ""
    );

    const fileName = this.createTagElement(
      TagNames.BLOCK,
      [CssClasses.CSS_VIEWER_FILE_NAME],
      CSS_VIEWER_FILE_NAME_TEXT
    );

    const label = this.createTagElement(
      TagNames.SECTION_LABEL,
      [CssClasses.CSS_VIEWER_TITLE],
      CSS_VIEWER_TITLE_TEXT
    );

    const numberLinesBlock = this.createTagElement(
      TagNames.BLOCK,
      [CssClasses.CSS_NUMBER_LINES],
      ""
    );

    const numberLines = this.createLineNumber();

    const comments = this.createTagElement(
      TagNames.BLOCK,
      [CssClasses.CSS_COMMENTS],
      CSS_COMMENTS_TEXT
    );

    this.renderCssEditor();
    numberLinesBlock.append(numberLines);
    cssViewerHeader.append(fileName, label);
    this.htmlElement.append(cssViewerHeader, numberLinesBlock, comments);
  }

  protected createHtml(): HTMLElement {
    const element = this.createTagElement(
      TagNames.SECTION,
      [CssClasses.CSS_VIEWER],
      ""
    );

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
      this.inputCssEditor.placeholder = CSS_INPUT_PLACEHOLDER_TEXT;

      this.cssEditor.append(
        this.inputCssEditor,
        this.submitButton,
        this.buttonHelp
      );
      this.htmlElement.append(this.cssEditor);
      this.createSubmitButton();
      this.inputCssEditor.addEventListener(TagNames.INPUT, (evt) => {
        //TODO подсветка кода в инпуте
        if (evt.target instanceof HTMLInputElement) {
          console.log(evt.target.value);
          const highlightedCode = hljs.highlight(evt.target.value, {
            language: "css",
          });
          this.inputCssEditor.innerHTML = highlightedCode.value;
        }

        this.inputCssEditor.classList.remove(
          CssClasses.CSS_WRONG_ANSWER_WOBBLE,
          CssClasses.CSS_RIGHT_ANSWER_BLINCK
        );
      });
      this.inputCssEditor.addEventListener("focus", () => {
        this.inputCssEditor.classList.remove(
          CssClasses.CSS_WRONG_ANSWER_WOBBLE,
          CssClasses.CSS_RIGHT_ANSWER_BLINCK
        );
      });
    }
  }

  public createSubmitButton() {
    if (this.submitButton instanceof HTMLButtonElement) {
      this.submitButton.type = "submit";

      const submit = () => {
        const level =
          Number(localStorage.getItem(Storage.SAVED_LEVEL)) ||
          START_LEVEL_NUMBER;
        if (this.inputCssEditor instanceof HTMLInputElement) {
          if (this.inputCssEditor?.value === levels[level - 1].selector) {
            if (level === FINISH_LEVEL_NUMBER) this.saveLevelNumber(1);
            this.saveLevelNumber(level + 1);
            this.inputCssEditor.classList.add(
              CssClasses.CSS_RIGHT_ANSWER_BLINCK
            );
            window.location.reload();
          } else {
            this.inputCssEditor?.classList.add(
              CssClasses.CSS_WRONG_ANSWER_WOBBLE
            );
          }
        }

        this.observerMethod.notify(EventName.CORRECT_ANSWER, level.toString());
      };
      this.submitButton.addEventListener("click", () => submit());

      this.inputCssEditor.addEventListener("keydown", (event) => {
        if (event.keyCode === 13 || event.key === "Enter") {
          event.preventDefault();
          submit();
        }
      });
    }
  }

  public createHelpButton() {
    const inputCssEditor = document.querySelector(CssClasses.INPUT_CSS_EDITOR);
    const block = inputCssEditor ? inputCssEditor : this.inputCssEditor;
    if (block instanceof HTMLInputElement) {
      block.innerHTML = "";
    }
    if (this.buttonHelp instanceof HTMLButtonElement) {
      this.buttonHelp.innerText = "?";

      this.buttonHelp.addEventListener("click", (event) => {
        event.preventDefault();

        const level =
          Number(localStorage.getItem(Storage.SAVED_LEVEL)) ||
          START_LEVEL_NUMBER;
        const answer = levels[level - 1].selector;

        if (this.inputCssEditor instanceof HTMLInputElement) {
          this.inputCssEditor.value = "";
          this.inputCssEditor.classList.remove(
            CssClasses.CSS_RIGHT_ANSWER_BLINCK
          );
        }
        this.printLetters(answer);
        this.saveIsUseHelp(level - 1, true);
      });
    }
  }

  private printLetters(str: string) {
    const inputCssEditor = document.querySelector(CssClasses.INPUT_CSS_EDITOR);
    const blockInput = inputCssEditor ? inputCssEditor : this.inputCssEditor;

    if (blockInput instanceof HTMLInputElement) {
      if (str.length > 0) {
        // const highlightedCode = hljs.highlight(str[0], {
        //   language: "xml",
        // }).value;
        blockInput.value += str[0];
        // blockInput.value += highlightedCode;
        setTimeout(() => this.printLetters(str.slice(1)), LETTERS_PRINT_TIME);
      }
    }
  }
}
