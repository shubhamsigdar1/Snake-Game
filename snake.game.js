//declaring global variable to track game board size
const LINE_PIXEL_COUNT = 40;
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT ** 2;

//Track scores to display to users
let totalFoodEaten = 0;
let totalDistanceTraveled = 0;

const gameContainer = document.getElementById('gameContainer');

//Generate the game board
const createGameBoardPixels = () => {
  for (let i = 1; i <= TOTAL_PIXEL_COUNT; i++) {
    gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
  }
};

//Shorten references to game pixels
const gameBoardPixel = document.getElementsByClassName('gameBoardPixel');

//create the randomly generated food item  in the game board
let currentFoodPosition = 0;
const createFood = () => {
  //remove existing food from board
  gameBoardPixel[currentFoodPosition].classList.remove('food');

  currentFoodPosition = Math.floor(Math.random() * TOTAL_PIXEL_COUNT);

  gameBoardPixel[currentFoodPosition].classList.add('food');
};

//start setting up snake behaviour
