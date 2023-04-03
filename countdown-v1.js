const releaseTime = new Date('April 12, 2023 11:00:00 UTC+8').getTime();
function updateCountdown() {
  const currentTime = new Date().getTime();
  const timeRemaining = releaseTime - currentTime;
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  document.getElementById('days').innerHTML = days;
  document.getElementById('hours').innerHTML = hours;
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;
}
updateCountdown();
setInterval(updateCountdown, 1000);