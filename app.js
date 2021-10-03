const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeCount = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = [
  "#FFFF66",
  "#FFCC33",
  "#FF6600",
  "#FF3300",
  "#FF6666",
  "#CC3333",
  "#FF0066",
  "#FF0099",
  "#FF33CC",
  "#FF66FF",
  "#CC00CC",
  "#CC00FF",
  "#9933FF",
  "#6600CC",
  "#6633FF",
  "#6666CC",
  "#3300CC",
  "#0000FF",
  "#3366CC",
  "#0099FF",
  "#00CCFF",
  "#339999",
  "#66FFFF",
  "#33FFCC",
  "#00CC99",
  "#00FF99",
  "#00FF00",
  "#33FF00",
];

let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  setTime(time);
  createRandomCircle();
}

function finishGame() {
  timeCount.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeCount.innerHTML = `00:${value}`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const colorRandom = getRandomColor();
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = colorRandom;
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  colorsLength = colors.length;
  colorRandomIndex = Math.floor(Math.random() * colorsLength);
  return colors[colorRandomIndex];
}
