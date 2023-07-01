import "./style.css";
import { CssClasses } from "../../enums/view/css-classes";
import { Attributes } from "../../enums/view/css-attributes";
import { TagNames } from "../../enums/view/tag-names";
import DefaultView from "../default-view";
import { RS_SCHOOL_LINCK, GITHUB_LINCK, YEAR_TEXT } from "../../data/constants";

export default class FooterViewerView extends DefaultView {
  constructor() {
    super();
    this.configureHtml();
  }

  private configureHtml() {
    const github = this.createTagElement(
      TagNames.BLOCK,
      [CssClasses.GITHUB],
      ""
    );
    const linckToGit = this.createTagElement(TagNames.LINK, [], "");
    linckToGit.setAttribute(Attributes.HREF, GITHUB_LINCK);
    linckToGit.setAttribute(Attributes.TARGET, "_blank");

    const year = this.createTagElement(
      TagNames.HEADER_THIRD,
      [CssClasses.YEAR],
      YEAR_TEXT
    );

    const rs = this.createTagElement(
      TagNames.BLOCK,
      [CssClasses.RS_SCHOOL_LOGO],
      ""
    );
    const rsLinck = this.createTagElement(TagNames.LINK, [], "");
    rsLinck.setAttribute(Attributes.HREF, RS_SCHOOL_LINCK);
    rsLinck.setAttribute(Attributes.TARGET, "_blank");

    this.htmlElement.append(year);
    this.htmlElement.append(github);
    github.append(linckToGit);
    this.htmlElement.append(rs);
    rs.append(rsLinck);
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.BLOCK);
    element.classList.add(CssClasses.FOOTER_VIEWER);

    return element;
  }
}
