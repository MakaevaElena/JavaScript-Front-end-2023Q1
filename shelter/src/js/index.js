import { pets } from './data.js';
import { PetModal } from './PetModal.js';
import { crossCheck } from './console.js';

import {
  moveLeft,
  moveRight,
  caruselHandler,
  BTN_LEFT,
  BTN_RIGHT,
  renderBlock,
  renderMainPetsCards,
} from './utils.js';
// const mediaDesktop = window.matchMedia('(min-width: 769px)');
// const mediaTablet = window.matchMedia('(max-width: 768px)').matches;
// const mediaMobile = window.matchMedia('(max-width: 320px)').matches;
const mainCaruselWrapper = document.querySelector('.main .carusel');
const petsCaruselWrapper = document.querySelector('.our-pets .carusel');

const PETS_CAROUSEL = document.querySelector('#pets-carusel');
const DOUBLE_ROW_LEFT = document.querySelector('#double-row-left');
const ROW_LEFT = document.querySelector('#row-left');
const ROW_RIGHT = document.querySelector('#row-right');
const DOUBLE_ROW_RIGHT = document.querySelector('#double-row-right');
const PAGE = document.querySelector('#number h4');

let left;
let center;
let right;

// MODAL

const addModalHandler = () => {
  document.querySelector('.carousel-wrapper').addEventListener('click', (evt) => {
    if (evt.target.closest('.pet-card')) {
      let clickedId = evt.target.closest('.pet-card').getAttribute('data-id');
      let clickedCardData = getClickedData(clickedId);
      // console.log(clickedId);
      renderModal(clickedCardData);
    }
  });
};

const getClickedData = (id) => {
  const res = pets.find((el) => el.id === Number(id));
  return res;
};

const renderModal = function (card) {
  let modal = new PetModal('modal', card);
  modal.renderModal();
};

window.onload = function () {
  if (pets) {
    if (mainCaruselWrapper) {
      // mainCaruselWrapper.innerHTML = '';

      let mainPets = pets.slice(0, 7);
      left = document.createElement('div');
      left.classList.add('item-left', 'columns');
      center = document.createElement('div');
      center.classList.add('item-center', 'columns');
      right = document.createElement('div');
      right.classList.add('item-right', 'columns');

      BTN_LEFT.addEventListener('click', moveLeft);
      BTN_RIGHT.addEventListener('click', moveRight);

      let number;
      if (document.documentElement.clientWidth <= 320) {
        number = 1;
      } else if (document.documentElement.clientWidth <= 768) {
        number = 2;
      } else number = 3;

      renderBlock(mainPets, number, left);
      renderBlock(mainPets, number, center);
      renderBlock(mainPets, number, right);
      mainCaruselWrapper.append(left);
      mainCaruselWrapper.append(center);
      mainCaruselWrapper.append(right);
      caruselHandler(mainPets, number);
    }

    if (petsCaruselWrapper) {
      // petsCaruselWrapper.innerHTML = '';
      center = document.createElement('div');
      center.classList.add('item-center', 'columns');

      let number;
      if (document.documentElement.clientWidth <= 320) {
        number = 3;
      } else if (document.documentElement.clientWidth <= 768) {
        number = 6;
      } else number = 8;

      renderBlock(pets, number, center);

      petsCaruselWrapper.append(center);

      const ITEM_CENTER = document.querySelector('.item-center');

      let numberPage = 1;

      const onRight = () => {
        let start = numberPage * number;
        let end = start + number;

        if (end <= pets.length) {
          let petsOnPage = pets.slice(start, end);
          ITEM_CENTER.innerHTML = '';

          renderMainPetsCards(petsOnPage).map((el) => ITEM_CENTER.append(el.createMainPetCard()));

          numberPage++;
          PAGE.innerHTML = numberPage;
          ROW_LEFT.classList.add('active');
          ROW_LEFT.classList.remove('disabled-link');
          DOUBLE_ROW_LEFT.classList.add('active');
          DOUBLE_ROW_LEFT.classList.remove('disabled-link');
        } else {
          ROW_RIGHT.classList.add('disabled-link');
          ROW_RIGHT.classList.remove('active');
          DOUBLE_ROW_RIGHT.classList.add('disabled-link');
          DOUBLE_ROW_RIGHT.classList.remove('active');
        }
      };
      ROW_RIGHT.addEventListener('click', onRight);

      const onLeft = () => {
        let end = (numberPage - 1) * number;
        let start = end - number;

        if (start <= pets.length && numberPage >= 1) {
          let petsOnPage = pets.slice(start, end);
          ITEM_CENTER.innerHTML = '';

          renderMainPetsCards(petsOnPage).map((el) => ITEM_CENTER.append(el.createMainPetCard()));

          numberPage--;
          PAGE.innerHTML = numberPage;
          ROW_LEFT.classList.add('active');
          ROW_LEFT.classList.remove('disabled-link');
          ROW_RIGHT.classList.add('active');
          ROW_RIGHT.classList.remove('disabled-link');
          DOUBLE_ROW_RIGHT.classList.add('active');
          DOUBLE_ROW_RIGHT.classList.remove('disabled-link');
        } else {
          ROW_LEFT.classList.add('disabled-link');
          ROW_LEFT.classList.remove('active');
          DOUBLE_ROW_LEFT.classList.add('disabled-link');
          DOUBLE_ROW_LEFT.classList.remove('active');
        }
      };
      ROW_LEFT.addEventListener('click', onLeft);

      const onFirst = () => {
        if (numberPage > 1) {
          let petsOnPage = pets.slice(0, number);
          ITEM_CENTER.innerHTML = '';
          renderMainPetsCards(petsOnPage).map((el) => ITEM_CENTER.append(el.createMainPetCard()));

          numberPage = 1;
          PAGE.innerHTML = numberPage;
          DOUBLE_ROW_RIGHT.classList.add('active');
          DOUBLE_ROW_RIGHT.classList.remove('disabled-link');
          ROW_RIGHT.classList.add('active');
          ROW_RIGHT.classList.remove('disabled-link');
        } else {
          DOUBLE_ROW_RIGHT.classList.add('disabled-link');
          DOUBLE_ROW_RIGHT.classList.remove('active');
        }
      };

      DOUBLE_ROW_LEFT.addEventListener('click', onFirst);

      const onLast = () => {
        console.log(numberPage);
        console.log();

        if (numberPage < pets.length / number) {
          let petsOnPage = pets.slice(pets.length - number, pets.length);
          ITEM_CENTER.innerHTML = '';
          renderMainPetsCards(petsOnPage).map((el) => ITEM_CENTER.append(el.createMainPetCard()));

          numberPage = pets.length / number;
          PAGE.innerHTML = numberPage;
          DOUBLE_ROW_LEFT.classList.add('disabled-link');
          DOUBLE_ROW_LEFT.classList.remove('active');
          ROW_LEFT.classList.add('disabled-link');
          ROW_LEFT.classList.remove('active');
        } else {
          DOUBLE_ROW_LEFT.classList.add('disabled-link');
          DOUBLE_ROW_LEFT.classList.remove('active');
        }
      };

      DOUBLE_ROW_RIGHT.addEventListener('click', onLast);
    }
    addModalHandler();
  }
  // MOBILE-MENU
  const burger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const links = document.querySelector('.mobile.navigation');

  const toggleMobileMenu = () => {
    if (burger.classList.contains('opened')) {
      mobileMenu.style.right = '-350px';
      burger.classList.remove('opened');
      burger.style.transform = 'rotate(0deg)';
      document.body.style.overflow = '';
    } else {
      mobileMenu.style.right = '0';
      burger.classList.add('opened');
      burger.style.transform = 'rotate(90deg)';
      document.body.style.overflow = 'hidden';
    }
  };

  // console.log(checkedBurger);
  burger.addEventListener('click', toggleMobileMenu);

  links.addEventListener('click', toggleMobileMenu);
};

crossCheck();
