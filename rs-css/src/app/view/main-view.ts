import "./style.css";
import { CssClasses } from "../enums/view/css-classes";
import { TagNames } from "../enums/view/tag-names";
// import Observer from "../observer/observer";
import CssViewerView from "./css-viewer/css-viewer-view";
import DefaultView from "./default-view";
import HtmlViewerView from "./html-viewer/html-viewer-view";
import LevelView from "./level/level-view";
import TableView from "./table/board-view";
import ObserverMethod from "../observer/observer-method";
import { levels } from "../data/data-levels";

export default class MainView extends DefaultView {
  constructor() {
    super();

    if (Number(localStorage.getItem("savedLevel")) > levels.length) {
      this.saveLevelNumber(1);
    }
    const observerMethod = new ObserverMethod();

    const levelView = new LevelView(observerMethod);
    const tableView = new TableView();
    const htmlViewerView = new HtmlViewerView(observerMethod);
    const cssViewerView = new CssViewerView();

    this.htmlElement.append(
      tableView.getHtmlElement(),
      levelView.getHtmlElement(),
      htmlViewerView.getHtmlElement(),
      cssViewerView.getHtmlElement()
    );
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.MAIN);
    element.classList.add(CssClasses.MAIN);
    return element;
  }
}
