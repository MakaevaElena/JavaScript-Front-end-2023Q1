// console.log(gameArr);
// gameArr.slice(0, 9);
// let arr = JSON.parse(localStorage.getItem('arr'));
let gameArr = [];
// let newArr = [];
export const saveResults = (message, count, time) => {
  const container = document.querySelector('.container');
  const saveContainer = document.createElement('div');
  saveContainer.classList.add('saveContainer');

  let game = { message: message, movies: count, time: time };

  // let gameArr = JSON.parse(localStorage.getItem('arr'));
  // let newArr = JSON.parse(localStorage.getItem('arr'));
  // console.log(newArr);

  if (gameArr !== '') gameArr.push(game);
  // localStorage.setItem('myKey',(localStorage.getItem('myKey') || '') + 'new value')
  // localStorage.setItem('arr', JSON.parse(localStorage.getItem('arr') || '') + JSON.parse(gameArr));
  localStorage.setItem('arr', JSON.stringify(gameArr));

  // console.log(localStorage);
  let newArr = JSON.parse(localStorage.getItem('arr'));
  // console.log('newArr', newArr);

  newArr.forEach((game, i) => {
    if (game.message)
      saveContainer.innerHTML = `<div class="results">
        <div class="result">${i}) ${game.message} the game! Movies: ${game.movies}. Time: ${game.time} seconds</div>
        </div>`;
  });
  if (saveContainer.innerHTML !== '' && container) {
    container.after(saveContainer);
  } else {
    const header = document.createElement('header');
    header.after(saveContainer);
  }

  localStorage.clear();
};
// export const renderResults = () => {
//   console.log(localStorage);
//   const container = document.querySelector('.container');
//   const saveContainer = document.createElement('div');
//   saveContainer.classList.add('saveContainer');

//   let newArr = JSON.parse(localStorage.getItem('arr'));

//   newArr.forEach((game, i) => {
//     if (game.message)
//       saveContainer.innerHTML = `<div class="results">
//         <div class="result">${i}) ${game.message} the game! Movies: ${game.movies}. Time: ${game.time} seconds</div>
//         </div>`;
//   });
//   const header = document.createElement('header');
//   if (saveContainer.innerHTML !== '' && container) {
//     container.after(saveContainer);
//   } else {
//     header.after(saveContainer);
//   }
// };
