let timerId;
let totalSeconds = 0;
export const timer = () => {
  const timerElement = document.querySelector('#timer');
  let seconds = 0;

  timerId = setInterval(() => {
    if (timer.textContent == '999') clearInterval(timerId);
    if (seconds < 10) timerElement.textContent = '00' + String(seconds);
    if (seconds >= 10 && seconds < 100) timerElement.textContent = '0' + String(seconds);
    if (seconds >= 100) timerElement.textContent = String(seconds);
    seconds++;
    totalSeconds = seconds;
  }, 1000);

  return seconds;
};

export function stopSecondCounter() {
  clearInterval(timerId);
  return totalSeconds;
}
