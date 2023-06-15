import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";

export default class FooterViewerView extends DefaultView {
  private readonly FOOTER_TEXT = "FOOTER";

  constructor() {
    super();
    this.configureHtml();
  }

  private configureHtml() {
    const headerTitle = document.createElement("h2");
    headerTitle.innerText = this.FOOTER_TEXT;
    this.htmlElement.append(headerTitle);
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.TABLE_ITEM);
    element.classList.add(CssClasses.FOOTER_VIEWER);

    return element;
  }
}
