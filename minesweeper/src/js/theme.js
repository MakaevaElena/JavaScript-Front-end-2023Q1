export const changeTheme = () => {
  let theme = 'white';
  const inputs = document.querySelectorAll('.theme input[type="radio"]');
  inputs.forEach((el) => {
    if (el.checked) theme = el.value;
  });

  let containerCellOpen;
  switch (theme) {
    case 'white':
      document.body.style.backgroundColor = '#dcdcdc';
      containerCellOpen = document.querySelector('.container .cell.open');
      // containerCellOpen.style.background = '#dcdcdc';
      break;
    case 'black':
      document.body.style.backgroundColor = '#1c1c1c';
      containerCellOpen = document.querySelector('.container .cell.open');
      // containerCellOpen.style.background = '#1c1c1c';
      break;
  }
};
