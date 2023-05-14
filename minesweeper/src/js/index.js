function Cell() {
  this.is_mine = false;
  this.mine_around = 0;
  this.is_open = false;
}

const container = document.createElement('div');
container.classList.add('container');
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

const start = () => {
  open_count = 0;
  setField();
  start_mine_counter();
};

start();

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
