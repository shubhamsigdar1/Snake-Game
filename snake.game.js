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
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

let snakeCurrentDirection = RIGHT_DIR;

const changeDirection = (newDirectionCode) => {
  if (newDirectionCode == snakeCurrentDirection) return;

  if (newDirectionCode == LEFT_DIR && snakeCurrentDirection !== RIGHT_DIR) {
    snakeCurrentDirection = newDirectionCode;
  } else if (newDirectionCode == UP_DIR && snakeCurrentDirection !== DOWN_DIR) {
    snakeCurrentDirection = newDirectionCode;
  } else if (
    newDirectionCode == RIGHT_DIR &&
    snakeCurrentDirection !== LEFT_DIR
  ) {
    snakeCurrentDirection = newDirectionCode;
  } else if (newDirectionCode == DOWN_DIR && snakeCurrentDirection !== UP_DIR) {
    snakeCurrentDirection = newDirectionCode;
  }
};

//set starting point for snake on load
let currentHeadPosition = TOTAL_PIXEL_COUNT / 2;

//set initial length
let snakeLength = 200;

//start moving snak, wrap around to other side of screen if needed
const moveSnake = () => {
  switch (snakeCurrentDirection) {
    case LEFT_DIR:
      --currentHeadPosition;
      const isHeadAtLeft =
        currentHeadPosition % LINE_PIXEL_COUNT == LINE_PIXEL_COUNT - 1 ||
        currentHeadPosition < 0;
      if (isHeadAtLeft) {
        currentHeadPosition += LINE_PIXEL_COUNT;
      }
      break;
    case RIGHT_DIR:
      ++currentHeadPosition;
      const isHeadAtRight = currentHeadPosition % LINE_PIXEL_COUNT === 0;
      if (isHeadAtRight) {
        currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT;
      }
      break;
    case UP_DIR:
      currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT;
      const isHeadAtTop = currentHeadPosition < 0;
      if (isHeadAtTop) {
        currentHeadPosition = currentHeadPosition + TOTAL_PIXEL_COUNT;
      }
      break;
    case DOWN_DIR:
      currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT;
      const isHeadAtBottom = currentHeadPosition > TOTAL_PIXEL_COUNT - 1;
      if (isHeadAtBottom) {
        currentHeadPosition = currentHeadPosition - TOTAL_PIXEL_COUNT;
      }
      break;
    default:
      break;
  }

  //access the correct pixel within the HTML collection
  let nextSnakeHeadPixel = gameBoardPixel[currentHeadPosition];

  //check if snake head is about to intersect with its own body
  if (nextSnakeHeadPixel.classList.contains('snakeBodyPixel')) {
    clearInterval(moveSnakeInterval);
    alert(
      `You have eaten ${totalFoodEaten} food and traveled ${totalDistanceTraveled} blocks.`
    );
    window.location.reload();
  }

  //Assuming empty pixel, add snake body styling
  nextSnakeHeadPixel.classList.add('snakeBodyPixel');
};

createGameBoardPixels();
createFood();

let moveSnakeInterval = setInterval(moveSnake, 100);
