'use strict';

const mouse = document.getElementById('mouse');
const number = document.getElementById('number');
let n = 0;

const timer = document.getElementById('timer');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const reset = document.getElementById('reset');
const start = document.getElementById('start');
let isRunning = false;
let startTime;
let timeLeft;
let timetoCountDown = 0;
let timerId;

//タイマー処理

//タイマー表示
function updateTimer(t) {
  const d = new Date(t);
  let m = d.getMinutes();
  let s = d.getSeconds();
  let ms = d.getMilliseconds();
  m = ('0' + m).slice(-2);
  s = ('0' + s).slice(-2);
  ms = ('00' + ms).slice(-3);
  const timerString = m + ':' + s + '.' + ms;
  timer.textContent = timerString;
  document.title = timerString;
}

//カウントダウン処理
function countDown() {
  timerId = setTimeout(() => {
    timeLeft = timetoCountDown - (Date.now() - startTime);
    if(timeLeft < 0) {
      isRunning = false;
      start.textContent = 'Start';
      clearTimeout(timerId);
      timeLeft = 0;
      timetoCountDown = 0;
      updateTimer(timeLeft);
      return;
    }
    updateTimer(timeLeft);
    countDown();
      
  }, 10);
}


//スタート押したら
start.addEventListener('click',() => {
  if (isRunning === false) {
    isRunning = true;
    start.textContent = 'Stop';
    startTime = Date.now();
    countDown();
  } else {
    isRunning = false;
    start.textContent = 'Start';
    timetoCountDown = timeLeft;
    clearTimeout(timerId);
  }
});

//min押したら
min.addEventListener('click', () => {
  if (isRunning === true) return;
  timetoCountDown += 60 * 1000;
  if(timetoCountDown >= 60 * 60 * 1000) timetoCountDown = 0;
  updateTimer(timetoCountDown);
});

//sec押したら
sec.addEventListener('click', () => {
  if (isRunning === true) return;
  timetoCountDown += 1000;
  if(timetoCountDown >= 60 * 60 * 1000) timetoCountDown = 0;
  updateTimer(timetoCountDown);
});

//reset押したら
reset.addEventListener('click', () => {
  timetoCountDown = 0;
  updateTimer(timetoCountDown);
  n = 0;
  number.textContent = n;
});


//マウスクリック処理
mouse.addEventListener('click',() => {
  if(isRunning === false) return;
  n++;
  number.textContent = n;
});




//背景処理
  let posX = 0;
  let posY = 0;
  setInterval(() => {
    
    posX += -1;
    posY += 1;
    body.style.backgroundPosition = posX + "px " + posY + "px";
  }, 1);
