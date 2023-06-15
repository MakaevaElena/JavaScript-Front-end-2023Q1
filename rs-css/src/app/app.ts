import MainView from "./view/main-view";

export default class App {
  constructor() {
    this.createViews;
  }

  createViews() {
    const mainView = new MainView();
    document.body.append(mainView.getHtmlElement());
  }
}
