const style = document.createElement('style');
style.innerHTML = `
  .countdown {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }

  .countdown div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
  }

  .countdown div span {
    font-size: 48px;
    font-weight: bold;
  }

  .countdown div div {
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 5px;
  }
`;
document.head.appendChild(style);
const countdownContainer = document.createElement('div');
countdownContainer.setAttribute('class', 'countdown');
countdownContainer.innerHTML = `
  <div>
    <span id="days"></span>
    <div>Days</div>
  </div>
  <div>
    <span id="hours"></span>
    <div>Hours</div>
  </div>
  <div>
    <span id="minutes"></span>
    <div>Minutes</div>
  </div>
  <div>
    <span id="seconds"></span>
    <div>Seconds</div>
  </div>
`;

document.getElementById('countdown-container').appendChild(countdownContainer);
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