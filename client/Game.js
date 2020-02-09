class Game {
  // Constructor
  constructor(gameWindow, gameCanvas) {
    this._$gameWindow   = gameWindow;
    this._$gameCanvas   = gameCanvas;
    this._$ctx          = gameCanvas.getContext('2d');
    this._$isGameOver   = false;
    this._$lives        = 3;
    this._$ball         = {};
    this._$paddle       = {};
    this._$bricks       = [];
    this._$inputs       = {};

    this._initBall();
    this._initPaddle();
    this._initBricks();
    this._initInputs();
  }

  // Public method
  start() {
    this._clearCanvas();
    this._draw();
    this._updateCoords();
    this._checkCollisions();
    if (!this.isGameOver) {
      this.gameWindow.requestAnimationFrame(this.start.bind(this));
    } else {
      this.gameWindow.alert('GAME OVER!');
    }
  }

  // Getters
  get gameWindow() {
    return this._$gameWindow;
  }

  get gameCanvas() {
    return this._$gameCanvas;
  }

  get ctx() {
    return this._$ctx;
  }

  get isGameOver() {
    return this._$isGameOver;
  }

  set isGameOver(value) {
    this._$isGameOver = value;
  }

  get lives() {
    return this._$lives;
  }

  get ball() {
    return this._$ball;
  }

  get paddle() {
    return this._$paddle;
  }

  get bricks() {
    return this._$bricks;
  }

  get inputs() {
    return this._$inputs;
  }

  // Private methods
  _initBall() {
    this.ball.radius = 10;
    this.ball.x = this.gameCanvas.width / 2;
    this.ball.y = this.gameCanvas.height / 2;
    this.ball.dx = 2;
    this.ball.dy = 2;
  }

  _initPaddle() {
    this.paddle.width = 70;
    this.paddle.height = 10;
    this.paddle.x = (this.gameCanvas.width - this.paddle.width) / 2;
    this.paddle.y = this.gameCanvas.height - this.paddle.height - 2;
    this.paddle.dx = 10;
    this.paddle.dy = 0;
  }

  _initBricks() {
    const margin = 20;
    const padding = 10;

    for (let i = 0; i < 3; ++i) {
      const brick = {};
      brick.width = 140;
      brick.height = 10;
      brick.x = margin + (i * (brick.width + padding));
      brick.y = margin;
      this.bricks.push(brick);
    }
  }

  _initInputs() {
    this.inputs.rightPressed = false;
    this.inputs.leftPressed = false;
    this.gameWindow.document.addEventListener('keydown', (e) => {
      if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.inputs.leftPressed = true;
      } else if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.inputs.rightPressed = true;
      }
    });
    this.gameWindow.document.addEventListener('keyup', (e) => {
      if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.inputs.leftPressed = false;
      } else if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.inputs.rightPressed = false;
      }
    });
  }

  _draw() {
    this._drawBall();
    this._drawPaddle();
    this._drawBricks();
  }

  _drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }

  _drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }

  _drawBricks() {
    for (const brick of this.bricks) {
      this.ctx.beginPath();
      this.ctx.rect(brick.x, brick.y, brick.width, brick.height);
      this.ctx.fillStyle = '#0095DD';
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  _updateCoords() {
    this._updateBallCoords();
    this._updatePaddleCoords();
  }

  _updateBallCoords() {
    if (this.ball.x + this.ball.dx > this.gameCanvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    }
    if (this.ball.y + this.ball.dy > this.gameCanvas.height - this.ball.radius) {
      this.isGameOver = true;
    }
    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;
  }

  _updatePaddleCoords() {
    if (this.inputs.rightPressed && (this.paddle.x + this.paddle.width + this.paddle.dx) <= this.gameCanvas.width) {
      this.paddle.x += this.paddle.dx;
    }
    if (this.inputs.leftPressed && (this.paddle.x - this.paddle.dx) >= 0) {
      this.paddle.x -= this.paddle.dx;
    }
  }

  _checkCollisions() {
    for (const brick of this.bricks) {
      if (this.ball.x + this.ball.radius > brick.x && this.ball.x - this.ball.radius < brick.x + brick.width
        && this.ball.y + this.ball.radius > brick.y && this.ball.y - this.ball.radius < brick.y + brick.height) {
        this.bricks.splice(this.bricks.indexOf(brick), 1);
        this.ball.dy = -this.ball.dy;
        break;
      }
    }
    if (this.ball.x + this.ball.radius > this.paddle.x && this.ball.x - this.ball.radius < this.paddle.x + this.paddle.width
      && this.ball.y + this.ball.radius > this.paddle.y && this.ball.y - this.ball.radius < this.paddle.y + this.paddle.height) {
      this.ball.dy = -this.ball.dy;
    }
  }

  _clearCanvas() {
    this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
  }


}
