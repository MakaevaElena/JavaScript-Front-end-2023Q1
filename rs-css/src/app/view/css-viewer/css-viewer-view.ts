import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";

export default class CssViewerView extends DefaultView {
  private readonly HEADER_TEXT = "CssViewerView";

  constructor() {
    super();
    this.configureHtml();
  }

  private configureHtml() {
    const label = document.createElement(TagNames.SECTION_HEADER);
    label.textContent = this.HEADER_TEXT;

    this.htmlElement.append(label);
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);
    element.classList.add(CssClasses.CSS_VIEWER);

    return element;
  }
}
