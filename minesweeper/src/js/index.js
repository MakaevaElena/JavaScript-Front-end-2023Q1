import { FinishModal } from './modal-finish.js';
import { timer, stopSecondCounter } from '../js/timer.js';

let countClicks = 0;
let isDisabled = true;

function soundStart() {
  const audio = new Audio();
  audio.src = './src/sounds/start.mp3';
  audio.autoplay = true;
}

function soundStop() {
  const audio = new Audio();
  audio.src = './src/sounds/stop.mp3';
  audio.autoplay = true;
}

function soundClick() {
  const audio = new Audio();
  audio.src = './src/sounds/click.mp3';
  audio.autoplay = true;
}

function soundFlag() {
  const audio = new Audio();
  audio.src = './src/sounds/tick.mp3';
  audio.autoplay = true;
}

function soundBomb() {
  const audio = new Audio();
  audio.src = './src/sounds/lose.mp3';
  audio.autoplay = true;
}

function soundWin() {
  const audio = new Audio();
  audio.src = './src/sounds/win.mp3';
  audio.autoplay = true;
}

function Cell() {
  this.is_mine = false;
  this.mine_around = 0;
  this.is_open = false;
}

const container = document.createElement('div');
container.classList.add('container', 'disable');
document.body.appendChild(container);

//условия игры
const width = 10;
const height = 10;
let field = [];
const mine_count = 10;
let open_count = 0;

const setField = () => {
  field = [];
  for (let i = 0; i < width; i++) {
    const column = [];
    for (let j = 0; j < height; j++) {
      column.push(new Cell());
    }
    field.push(column);
  }

  //разбросать мины
  for (let i = 0; i < mine_count; ) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (field[x][y].is_mine == false) {
      field[x][y].is_mine = true;
      i++;
    }
  }
};

//мины вокруг одной ячейки - в середине поля и скраю
const mine_around_counter = (x, y) => {
  const x_start = x > 0 ? x - 1 : x;
  const y_start = y > 0 ? y - 1 : y;
  const x_end = x < width - 1 ? x + 1 : x;
  const y_end = y < height - 1 ? y + 1 : y;
  let count = 0;
  for (let i = x_start; i <= x_end; i++) {
    for (let j = y_start; j <= y_end; j++) {
      if (field[i][j].is_mine && !(x == i && y == j)) count++;
    }
  }
  field[x][y].mine_around = count;
  field[x][y].innerHTML = count;
};
//мины вокруг всех ячеек
const start_mine_counter = () => {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      mine_around_counter(i, j);
    }
  }
};

const init = () => {
  open_count = 0;
  setField();
  start_mine_counter();
  // timer();
};

init();

const renderPopup = (score, time, massage) => {
  let modal = new FinishModal('popup', { score, time, massage });
  modal.renderModal();
};

const renderHeader = () => {
  if (document.querySelector('.header')) {
    const header = document.createElement('header');
    document.body.removeChild(header);
  } else {
    const header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML += `<output id="clicks">000</output>
    <button id="start">
      START
    </button>
    <output id="timer">000</output>`;
    // document.body.appendChild(header);
    const container = document.querySelector('.container');
    document.body.insertBefore(header, container);
  }
};

// renderHeader();

const renderField = () => {
  container.innerHTML = '';
  const table = document.createElement('div');
  table.classList.add('table');
  for (let i = 0; i < height; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    row.setAttribute('id', i);
    for (let j = 0; j < width; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('id', j);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  container.appendChild(table);
  // container.setAttribute('pointer-events', 'none');
};

renderField();

const renderMine = () => {
  const table = container.children[0];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const cell = table.children[y].children[x];
      if (field[x][y].is_mine) {
        cell.classList.add('mine');
      }
    }
  }
};
renderMine();

const recurseOpen = (x, y) => {
  const table = container.children[0];

  const cell = table.children[y].children[x];
  if (field[x][y].is_open) return;
  if (field[x][y].is_mine) {
    cell.classList.add('mine');
    renderMine();
    setTimeout(() => {
      soundBomb();
      //!
      renderPopup(countClicks, stopSecondCounter() - 1, `Game over. Try again`);
      // init();
      // renderField();
      container.classList.add('disable');
      // isDisabled = true;
      stopSecondCounter();
    }, 200);
  } else {
    if (field[x][y].mine_around > 0) {
      cell.innerHTML = field[x][y].mine_around;
      cell.dataset.count = field[x][y].mine_around;
    }
    field[x][y].is_open = true;
    cell.classList.add('open');
    open_count++;
    if (width * height - mine_count == open_count) {
      //если ячейка последняя;
      stopSecondCounter();
      renderPopup(
        countClicks,
        stopSecondCounter(),
        `Hooray! You found all mines in ${
          stopSecondCounter() - 1
        } seconds and ${countClicks} moves!`,
      );
      container.classList.add('disable');
      soundWin();
      init();
      renderField();
    }
    if (field[x][y].mine_around == 0) {
      //если рядом мин нет то
      const x_start = x > 0 ? x - 1 : x;
      const y_start = y > 0 ? y - 1 : y;
      const x_end = x + 1 < width ? x + 1 : x;
      const y_end = y + 1 < height ? y + 1 : y;
      for (let i = x_start; i <= x_end; i++) {
        //пробегаемся по всем
        //соседним ячейкам
        for (let j = y_start; j <= y_end; j++) {
          recurseOpen(i, j);
        }
      }
    }
  }
};

const openCell = (event) => {
  const x = event.target.getAttribute('id');
  const y = event.target.parentNode.getAttribute('id');
  recurseOpen(x, y);
};

container.addEventListener('click', (event) => {
  soundClick();
  if (event.target.matches('.cell') && !event.target.matches('.mark')) {
    openCell(event);
  }

  countClicks++;
  const clicks = document.querySelector('#clicks');

  if (countClicks < 10) clicks.textContent = '00' + String(countClicks);
  if (countClicks >= 10 && countClicks < 100) clicks.textContent = '0' + String(countClicks);
  if (countClicks >= 100) clicks.textContent = String(countClicks);
  // clicks.innerHTML = countClicks;
});

const mark = (event) => {
  const x = event.target.getAttribute('id');
  const y = event.target.parentNode.getAttribute('id');
  if (field[x][y].is_open) return;
  event.target.classList.toggle('mark');
};

container.addEventListener('contextmenu', (event) => {
  soundFlag();
  event.preventDefault();
  if (event.target.matches('.cell')) {
    mark(event);
  }
});

const startNewGameHandler = () => {
  const startButton = document.querySelector('#start');
  init();
  renderField();
  if (startButton.classList.contains('active')) soundStop();
  countClicks = 0;
  const clicks = document.querySelector('#clicks');
  clicks.textContent = '000';
  const timerElement = document.querySelector('#timer');
  timerElement.textContent = '000';
  stopSecondCounter();
  timer();
  startButton.innerHTML =
    startButton.innerText === 'START'
      ? (startButton.innerText = 'STOP')
      : (startButton.innerText = 'START');
  startButton.classList.toggle('active');

  !startButton.classList.contains('active') ? stopSecondCounter() : init();

  if (startButton.classList.contains('active')) {
    soundStart();
    container.classList.remove('disable');
  }
};

const timerElement = document.querySelector('#timer');

const startNewGame = () => {
  const startButton = document.querySelector('#start');
  startButton.addEventListener('click', () => startNewGameHandler());
};

init();
renderHeader();
renderField();

startNewGame();
