import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";

export default class FooterViewerView extends DefaultView {
  private readonly FOOTER_TEXT = "";

  constructor() {
    super();
    this.configureHtml();
  }

  private configureHtml() {
    // const headerTitle = document.createElement("h2");
    // headerTitle.innerText = this.FOOTER_TEXT;
    // this.htmlElement.append(headerTitle);

    const headerTitle = this.createTagElement(
      "h2",
      ["header-title"],
      this.FOOTER_TEXT
    );
    const github = this.createTagElement("div", ["github"], "");
    const linckToGit = this.createTagElement("a", [], "");
    linckToGit.setAttribute("href", "https://github.com/MakaevaElena");
    linckToGit.setAttribute("target", "_blank");

    const year = this.createTagElement("h3", ["year"], "2023");

    const rs = this.createTagElement("div", ["rsschool-logo"], "");
    const rsLinck = this.createTagElement("a", [], "");
    rsLinck.setAttribute("href", "https://rs.school/js/");
    rsLinck.setAttribute("target", "_blank");

    this.htmlElement.append(year);
    this.htmlElement.append(headerTitle);
    this.htmlElement.append(github);
    github.append(linckToGit);
    this.htmlElement.append(rs);
    rs.append(rsLinck);
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.TABLE_ITEM);
    element.classList.add(CssClasses.FOOTER_VIEWER);

    return element;
  }
}
