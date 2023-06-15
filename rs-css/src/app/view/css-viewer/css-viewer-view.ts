import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";

export default class CssViewerView extends DefaultView {
  private readonly HEADER_TEXT = "CSS Editor";

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
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);
    element.classList.add(CssClasses.CSS_VIEWER);

    return element;
  }
}
