export const menu = () => {
  const menu = document.createElement('div');
  const container = document.querySelector('.header');
  menu.classList.add('menu');
  menu.innerHTML = `<div class="grade">
  <div><label class="difficulty"><input id="easy" type="radio" name="difficulty" value="10">Easy</label></div>
  <div><label class="difficulty"><input id="medium" type="radio" name="difficulty" value="15">Medium</label></div>
  <div><label class="difficulty"><input id="hard" type="radio" name="difficulty" value="25">Hard</label></div>
  </div>`;
  document.body.insertBefore(menu, container);
};
