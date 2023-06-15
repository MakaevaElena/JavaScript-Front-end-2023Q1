import "./style.css";
import { CssClasses } from "../enums/view/css-classes";
import { TagNames } from "../enums/view/tag-names";
import Observer from "../observer/observer";
import CssViewerView from "./css-viewer/css-viewer-view";
import DefaultView from "./default-view";
import HtmlViewerView from "./html-viewer/html-viewer-view";
import LevelView from "./level/level-view";
import TableView from "./table/table-view";
import FooterViewerView from "./footer-viewer/footer-viewer-view";

export default class MainView extends DefaultView {
  constructor() {
    super();

    const observer = new Observer();

    const levelView = new LevelView(observer);
    const tableView = new TableView(observer);
    const htmlViewerView = new HtmlViewerView(observer);
    const cssViewerView = new CssViewerView();
    const footerViewerView = new FooterViewerView();

    this.htmlElement.append(
      tableView.getHtmlElement(),
      levelView.getHtmlElement(),
      htmlViewerView.getHtmlElement(),
      cssViewerView.getHtmlElement()
    );

    this.htmlElement.after(footerViewerView.getHtmlElement());
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.MAIN);
    element.classList.add(CssClasses.MAIN);
    return element;
  }
}
