(() => {
  const canvas = document.getElementById("game-canvas");
  const game = new Game(window, canvas);

  game.start();
})();

/*const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
let paddleDx = 5;

let rightPressed = false;
let leftPressed = false;

function clearCanvas() {

}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  clearCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();

  if (x + dx > canvas.width - ballRadius|| x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = - dy;
  }
  x += dx;
  y += dy;

  if (rightPressed) {
    paddleX += paddleDx;
  }
  if (leftPressed) {
    paddleX -= paddleDx;
  }
  requestAnimationFrame(draw);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  }
});

draw();*/
