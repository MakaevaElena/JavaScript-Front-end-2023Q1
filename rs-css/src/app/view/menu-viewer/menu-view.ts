import "./style.css";
import DefaultView from "../default-view";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import { levels } from "../../data/data-levels";
// import LevelView from "../level/level-view";
// import ObserverMethod from "../../observer/observer-method";

export default class MenuView extends DefaultView {
  // private observerMethod = new ObserverMethod();
  // private levelView = new LevelView(this.observerMethod);

  constructor() {
    super();
    this.configureHtml();
  }

  private configureHtml() {
    const links = this.createTagElement("ul", ["level-list"], "");

    for (let i = 0; i < levels.length; i += 1) {
      const levelLine = this.createTagElement(
        "li",
        ["level-line"],
        `<span class="done" data-id=${i + 1}></span> Level ${
          levels[i].level
        }. ${levels[i].syntax}`
      );
      //! бесконечный вызов
      // levelLine.addEventListener("click", (evt: Event) =>
      //   this.levelView.goToLevel(i + 1)
      // );
      links.append(levelLine);
    }
    // links.addEventListener("click", (evt: Event) => {
    //   if (evt.target instanceof HTMLElement) {
    //     this.levelView.goToLevel(Number(evt.target.dataset.id));
    //   }
    // });
    this.htmlElement.append(links);
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);

    element.classList.add(CssClasses.MENU);
    return element;
  }
}
