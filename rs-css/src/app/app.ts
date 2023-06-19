import MainView from "./view/main-view";
import FooterViewerView from "./view/footer-viewer/footer-viewer-view";

export default class App {
  constructor() {
    this.createViews();
  }

  createViews() {
    const mainView = new MainView();
    document.body.append(mainView.getHtmlElement());
    const footerViewerView = new FooterViewerView();
    document.body.append(footerViewerView.getHtmlElement());
  }
}
