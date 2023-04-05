import { pets } from './data.js';
import { MainPetCard } from './petCard.js';
// const mediaDesktop = window.matchMedia('(min-width: 769px)');
// const mediaTablet = window.matchMedia('(max-width: 768px)').matches;
// const mediaMobile = window.matchMedia('(max-width: 320px)').matches;
const mainCaruselWrapper = document.querySelector('.main .carusel');
const petsCaruselWrapper = document.querySelector('.our-pets .carusel');

const BTN_LEFT = document.querySelector('#btn-left');
const BTN_RIGHT = document.querySelector('#btn-right');
const CAROUSEL = document.querySelector('#carusel');
let left;
let center;
let right;

const shuffledArr = (arr) => arr.sort(() => Math.random() - 0.5);

function compare(arr1, arr2) {
  // console.log('arr1', arr1);
  // console.log('arr2', arr2);

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        return true;
      }
    }
  }
  return false;
}

const renderMainPetsCards = function (data) {
  const mainPetsCards = [];
  data.map((el) => {
    mainPetsCards.push(new MainPetCard(el));
  });
  return mainPetsCards;
};

let prevArr = [];
const renderBlock = (data, num, position) => {
  let newArr = [];
  // console.log('prevArr', prevArr);
  let arr = shuffledArr(data).slice(0, num);
  // console.log(arr);
  arr.map((el) => newArr.push(el.id));

  if (!compare(newArr, prevArr)) {
    let newPets = renderMainPetsCards(arr);
    newPets.map((el) => position.append(el.createMainPetCard()));
    prevArr = newArr;
  } else {
    renderBlock(data, num, position);
  }
};

const moveLeft = () => {
  CAROUSEL.classList.add('transition-left');
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
};

const moveRight = () => {
  CAROUSEL.classList.add('transition-right');
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
};

const caruselHandler = () => {
  const ITEM_LEFT = document.querySelector('.item-left');
  const ITEM_RIGHT = document.querySelector('.item-right');

  CAROUSEL.addEventListener('animationend', (animationEvent) => {
    let changedItem;
    if (animationEvent.animationName === 'move-left') {
      CAROUSEL.classList.remove('transition-left');
      changedItem = ITEM_LEFT;

      document.querySelector('.item-center').innerHTML = ITEM_LEFT.innerHTML;
    } else {
      CAROUSEL.classList.remove('transition-right');
      changedItem = ITEM_RIGHT;

      document.querySelector('.item-center').innerHTML = ITEM_RIGHT.innerHTML;
    }

    changedItem.innerHTML = '';

    renderBlock(pets, 3, changedItem);

    // !нужно запомнить предыдущую карточку левую и правую
    // !проверить, если она есть, то применять ее

    // let newPets = renderMainPetsCards(shuffledArr(pets)).slice(0, 3);
    // newPets.map((el) => changedItem.append(el.createMainPetCard()));

    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);
  });
};

window.onload = function () {
  if (pets) {
    if (mainCaruselWrapper) {
      // mainCaruselWrapper.innerHTML = '';
      left = document.createElement('div');
      left.classList.add('item-left', 'columns');
      center = document.createElement('div');
      center.classList.add('item-center', 'columns');
      right = document.createElement('div');
      right.classList.add('item-right', 'columns');

      BTN_LEFT.addEventListener('click', moveLeft);
      BTN_RIGHT.addEventListener('click', moveRight);

      renderBlock(pets, 3, left);
      renderBlock(pets, 3, center);
      renderBlock(pets, 3, right);
      mainCaruselWrapper.append(left);
      mainCaruselWrapper.append(center);
      mainCaruselWrapper.append(right);
      caruselHandler();
    }

    if (petsCaruselWrapper) {
      // petsCaruselWrapper.innerHTML = '';
      const left = document.createElement('div');
      left.classList.add('item-left', 'columns');

      let number;

      if (document.documentElement.clientWidth <= 320) {
        number = 3;
      } else if (document.documentElement.clientWidth <= 768) {
        number = 6;
      } else number = 8;

      renderMainPetsCards(pets)
        .slice(0, number)
        .map((el) => left.append(el.createMainPetCard()));

      petsCaruselWrapper.append(left);
    }

    // addTestimonialsHandler();
  }
};

// console.log(
//   'Оценка за задание: 100/100 баллов\n\nТребования к вёрстке\n\nВёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n\nблок <header>: +2\nблок Not only: +2\nблок About: +2\nблок Our Friends: +2\nблок Help: +2\nблок In addition: +2\nблок <footer>: +2\nВёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n\nблок <header>: +2\nблок Not only: +2\nблок About: +2\nблок Our Friends: +2\nблок Help: +2\nблок In addition: +2\nблок <footer>: +2\nВёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n\nблок <header>: +2\nблок Not only: +2\nблок About: +2\nблок Our Friends: +2\nблок Help: +2\nблок In addition: +2\nблок <footer>: +2\nВёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\nблок <header>: +2\nблок Our Friends: +2\nблок <footer>: +2\nВёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n\nблок <header>: +2\nблок Our Friends: +2\nблок <footer>: +2\nВёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n\nблок <header>: +2\nблок Our Friends: +2\nблок <footer>: +2\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n\nнет полосы прокрутки при ширине страницы Main от 1280рх до 768рх: +5\nнет полосы прокрутки при ширине страницы Main от 768рх до 320рх: +5\nнет полосы прокрутки при ширине страницы Pets от 1280рх до 768рх: +5\nнет полосы прокрутки при ширине страницы Pets от 768рх до 320рх: +5\nВерстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8\n\nна странице Main: +4\nна странице Pets: +4\nПри ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\nОткрытие меню при клике на иконку бургер-меню на текущем этапе не проверяется\nВерстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ : +8\n',
// );
