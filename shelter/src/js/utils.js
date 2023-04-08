import { MainPetCard } from './PetCard.js';

const CAROUSEL = document.querySelector('#carusel');

export const BTN_LEFT = document.querySelector('#btn-left');
export const BTN_RIGHT = document.querySelector('#btn-right');

export const shuffledArr = (arr) => arr.sort(() => Math.random() - 0.5);

export const compare = (arr1, arr2) => {
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
};

export const renderMainPetsCards = function (data) {
  const mainPetsCards = [];
  data.map((el) => {
    mainPetsCards.push(new MainPetCard(el));
  });
  return mainPetsCards;
};

let prevArr = [];
export const renderBlock = (data, num, position) => {
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

export const moveLeft = () => {
  CAROUSEL.classList.add('transition-left');
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
};

export const moveRight = () => {
  CAROUSEL.classList.add('transition-right');
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
};

export const caruselHandler = (data, num) => {
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
    renderBlock(data, num, changedItem);

    // !нужно запомнить предыдущую карточку левую и правую
    // !проверить, если она есть, то применять ее

    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);
  });
};

// ПАГИНАЦИЯ



const getDataById = (data, arrId) => {
  return data.map((obj, (i) => filter((el) => data.id === arrId[i])));
};
