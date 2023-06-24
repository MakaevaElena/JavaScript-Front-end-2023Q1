import "./style.css";
import DefaultView from "../default-view";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import { levels } from "../../data/data-levels";

export default class MenuView extends DefaultView {
  private levelNum = Number(localStorage.getItem("savedLevel")) || 0;
  private links = this.createTagElement("ul", ["level-list"], "");
  constructor() {
    super();
    this.configureHtml(this.levelNum);
  }

  public configureHtml(level: number) {
    // const links = this.createTagElement("ul", ["level-list"], "");
    this.links.innerHTML = "";
    for (let i = 0; i < levels.length; i += 1) {
      // const levelNum = Number(localStorage.getItem("savedLevel")) || 0;
      const levelLine = this.createTagElement(
        "li",
        ["level-line"],
        `<span class="done" data-id=${i + 1}></span> Level ${
          levels[i].level
        }. ${levels[i].syntax}`
      );
      this.links.append(levelLine);
      // console.log(i);
      // console.log(this.levelNum);
      if (i === level - 1) {
        levelLine.style.boxShadow = "0 0 10px #0000004d";
        levelLine.style.backgroundColor = "#6b6b6b";
      }
    }
    //! бесконечный вызов
    // links.addEventListener("click", (evt: Event) => {
    //   if (evt.target instanceof HTMLElement) {
    //     this.levelView.goToLevel(Number(evt.target.dataset.id));
    //   }
    // });
    this.htmlElement.append(this.links);
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);

    element.classList.add(CssClasses.MENU);
    return element;
  }
}
