import { renderField, getGrade } from '../js/index.js';
import { changeTheme } from '../js/theme.js';

export const menu = () => {
  const menu = document.createElement('div');
  const container = document.querySelector('.header');
  menu.classList.add('menu');
  menu.innerHTML = `<div class="grade">
  <div><label class="difficulty"><input id="easy" type="radio" name="difficulty" value="10">Easy</label></div>
  <div><label class="difficulty"><input id="medium" type="radio" name="difficulty" value="15">Medium</label></div>
  <div><label class="difficulty"><input id="hard" type="radio" name="difficulty" value="25">Hard</label></div>
  </div>
  <div class="theme">
  <div><label><input id="black" type="radio" name="theme" value="black">Black</input></label></div>
  <div><label><input id="white" type="radio" name="theme" value="white">White</input></label></div>
  </div>`;
  document.body.insertBefore(menu, container);

  const grade = document.querySelector('.grade');
  grade.addEventListener('click', () => {
    getGrade();
    renderField();
  });

  const theme = document.querySelector('.theme');
  theme.addEventListener('change', () => {
    changeTheme();
  });
};
