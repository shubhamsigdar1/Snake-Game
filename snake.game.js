//declaring global variable
const LINE_PIXEL_COUNT = 40;
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT ** 2;

//declare counter
let totalFoodEaten = 0;
let totalDistanceTraveled = 0;

const gameContainer = document.getElementById('gameContainer');

const createGameBoardPixels = () => {
  for (let i = 1; i <= TOTAL_PIXEL_COUNT; i++) {
    gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
  }
};
