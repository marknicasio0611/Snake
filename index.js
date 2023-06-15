var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Snake properties
var snakeSize = 20;
var snake = [
  { x: 200, y: 200 },
  { x: 180, y: 200 },
  { x: 160, y: 200 },
];

// Food properties
var food = { x: 0, y: 0 };

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveSnake();
  if (checkCollision()) {
    gameOver();
    return;
  }
  if (checkFoodCollision()) {
    addSnakeSegment();
    placeFood();
  }
  drawFood();
  drawSnake();

  setTimeout(gameLoop, 100);
}

// Move snake
var dx = snakeSize;
var dy = 0;
function moveSnake() {
  var head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

// Draw snake
function drawSnake() {
  snake.forEach(function (segment, index) {
    ctx.fillStyle = index === 0 ? "#333" : "#888";
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(segment.x, segment.y, snakeSize, snakeSize);
  });
}

// Add snake segment
function addSnakeSegment() {
  var tail = snake[snake.length - 1];
  snake.push({ x: tail.x, y: tail.y });
}

// Check collision with self or walls
function checkCollision() {
  var head = snake[0];
  return (
    snake.slice(1).some(function (segment) {
      return segment.x === head.x && segment.y === head.y;
    }) ||
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  );
}

// Generate random position for food
function placeFood() {
  var randomX = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
  var randomY = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;

  // Ensure food doesn't overlap with the snake
  while (snake.some(function (segment) {
    return segment.x === randomX && segment.y === randomY;
  })) {
    randomX = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
    randomY = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
  }

  food.x = randomX;
  food.y = randomY;
}

// Draw food
function drawFood() {
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
  ctx.strokeStyle = "#fff";
  ctx.strokeRect(food.x, food.y, snakeSize, snakeSize);
}

// Check collision with food
function checkFoodCollision() {
  var head = snake[0];
  return head.x === food.x && head.y === food.y;
}

// Game over
function gameOver() {
  ctx.fillStyle = "#333";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

// Handle keyboard controls
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" && dy !== snakeSize) {
    dx = 0;
    dy = -snakeSize;
  }
  if (event.key === "ArrowDown" && dy !== -snakeSize) {
    dx = 0;
    dy = snakeSize;
  }
  if (event.key === "ArrowLeft" && dx !== snakeSize) {
    dx = -snakeSize;
    dy = 0;
  }
  if (event.key === "ArrowRight" && dx !== -snakeSize) {
    dx = snakeSize;
    dy = 0;
  }
});

// Start the game
placeFood();
gameLoop();