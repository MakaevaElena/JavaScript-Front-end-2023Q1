export function soundStart() {
  const audio = new Audio();
  audio.src = './src/sounds/start.mp3';
  audio.autoplay = true;
}

export function soundStop() {
  const audio = new Audio();
  audio.src = './src/sounds/stop.mp3';
  audio.autoplay = true;
}

export function soundClick() {
  const audio = new Audio();
  audio.src = './src/sounds/click.mp3';
  audio.autoplay = true;
}

export function soundFlag() {
  const audio = new Audio();
  audio.src = './src/sounds/tick.mp3';
  audio.autoplay = true;
}

export function soundBomb() {
  const audio = new Audio();
  audio.src = './src/sounds/lose.mp3';
  audio.autoplay = true;
}

export function soundWin() {
  const audio = new Audio();
  audio.src = './src/sounds/win.mp3';
  audio.autoplay = true;
}
