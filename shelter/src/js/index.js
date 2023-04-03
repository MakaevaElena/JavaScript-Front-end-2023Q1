import { pets } from './data.js';
import { MainPetCard } from './petCard.js';
// console.log(pets);

const mainCaruselWrapper = document.querySelector('.main .carusel');

window.onload = function () {
  if (pets) {
    clearMainCaruselWrapper();

    renderMainPetsCards(pets)
      .slice(0, 3)
      .map((el) => mainCaruselWrapper.append(el.createMainPetCard()));

    // addTestimonialsHandler();
  }
};

const clearMainCaruselWrapper = function () {
  mainCaruselWrapper.innerHTML = '';
  // return wrapper;
};

const renderMainPetsCards = function (data) {
  const mainPetsCards = [];
  data.map((el) => {
    mainPetsCards.push(new MainPetCard(el));
  });
  // console.log(testimonials);
  return mainPetsCards;
};

// console.log(
//   'Оценка за задание: 100/100 баллов\n\nТребования к вёрстке\n\nВёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n\nблок <header>: +2\nблок Not only: +2\nблок About: +2\nблок Our Friends: +2\nблок Help: +2\nблок In addition: +2\nблок <footer>: +2\nВёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n\nблок <header>: +2\nблок Not only: +2\nблок About: +2\nблок Our Friends: +2\nблок Help: +2\nблок In addition: +2\nблок <footer>: +2\nВёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n\nблок <header>: +2\nблок Not only: +2\nблок About: +2\nблок Our Friends: +2\nблок Help: +2\nблок In addition: +2\nблок <footer>: +2\nВёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\nблок <header>: +2\nблок Our Friends: +2\nблок <footer>: +2\nВёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n\nблок <header>: +2\nблок Our Friends: +2\nблок <footer>: +2\nВёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n\nблок <header>: +2\nблок Our Friends: +2\nблок <footer>: +2\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n\nнет полосы прокрутки при ширине страницы Main от 1280рх до 768рх: +5\nнет полосы прокрутки при ширине страницы Main от 768рх до 320рх: +5\nнет полосы прокрутки при ширине страницы Pets от 1280рх до 768рх: +5\nнет полосы прокрутки при ширине страницы Pets от 768рх до 320рх: +5\nВерстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8\n\nна странице Main: +4\nна странице Pets: +4\nПри ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\nОткрытие меню при клике на иконку бургер-меню на текущем этапе не проверяется\nВерстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ : +8\n',
// );
