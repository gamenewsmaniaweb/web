const countdownContainer = document.createElement('div');
countdownContainer.classList.add('countdown');

const daysContainer = document.createElement('div');
const daysSpan = document.createElement('span');
daysSpan.setAttribute('id', 'days');
const daysLabel = document.createElement('div');
daysLabel.innerText = 'Days';
daysContainer.appendChild(daysSpan);
daysContainer.appendChild(daysLabel);

const hoursContainer = document.createElement('div');
const hoursSpan = document.createElement('span');
hoursSpan.setAttribute('id', 'hours');
const hoursLabel = document.createElement('div');
hoursLabel.innerText = 'Hours';
hoursContainer.appendChild(hoursSpan);
hoursContainer.appendChild(hoursLabel);

const minutesContainer = document.createElement('div');
const minutesSpan = document.createElement('span');
minutesSpan.setAttribute('id', 'minutes');
const minutesLabel = document.createElement('div');
minutesLabel.innerText = 'Minutes';
minutesContainer.appendChild(minutesSpan);
minutesContainer.appendChild(minutesLabel);

const secondsContainer = document.createElement('div');
const secondsSpan = document.createElement('span');
secondsSpan.setAttribute('id', 'seconds');
const secondsLabel = document.createElement('div');
secondsLabel.innerText = 'Seconds';
secondsContainer.appendChild(secondsSpan);
secondsContainer.appendChild(secondsLabel);

countdownContainer.appendChild(daysContainer);
countdownContainer.appendChild(hoursContainer);
countdownContainer.appendChild(minutesContainer);
countdownContainer.appendChild(secondsContainer);

document.body.appendChild(countdownContainer);
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