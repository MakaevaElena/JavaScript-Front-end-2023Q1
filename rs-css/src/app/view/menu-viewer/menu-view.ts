import "./style.css";
import DefaultView from "../default-view";
import { CssClasses } from "../../enums/view/css-classes";
import { TagNames } from "../../enums/view/tag-names";
import { levels } from "../../data/data-levels";

export default class MenuView extends DefaultView {
  private levelNum = Number(localStorage.getItem("savedLevel")) || 0;
  private levelList = this.createTagElement("ul", ["level-list"], "");
  // private levelLine?: HTMLElement | null;
  constructor() {
    super();
    this.configureHtml(this.levelNum);
  }

  public configureHtml(level: number) {
    // const levelList = this.createTagElement("ul", ["level-list"], "");
    this.levelList.innerHTML = "";
    for (let i = 0; i < levels.length; i += 1) {
      // const levelNum = Number(localStorage.getItem("savedLevel")) || 0;
      const levelLine = this.createTagElement(
        "li",
        ["level-line"],
        `<span class="done" data-id=${i + 1}></span> Level ${
          levels[i].level
        }. ${levels[i].syntax}`
      );
      this.levelList.append(levelLine);
      // console.log(i);
      // console.log(this.levelNum);
      if (i === level - 1) {
        levelLine.style.boxShadow = "0 0 10px #0000004d";
        // levelLine.style.backgroundColor = "#6b6b6b";
        levelLine.style.fontSize = "1.5rem";
        levelLine.style.fontWeight = "600";
      }
    }

    this.htmlElement.append(this.levelList);
    console.log(this.levelList);

    if (this.levelList instanceof HTMLUListElement) {
      this.levelList.addEventListener("click", (evt: Event) => {
        if (evt.target instanceof HTMLLIElement) {
          // level = Number(evt.target.dataset.id);
          // console.log(level);
          // this.saveLevelNumber(level);
          // window.location.reload();
        }
      });
    }
  }

  protected createHtml(): HTMLElement {
    const element = document.createElement(TagNames.SECTION);

    element.classList.add(CssClasses.MENU);
    return element;
  }
}
