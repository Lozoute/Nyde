class Game {
  // Constructor
  constructor(gameWindow, gameCanvas) {
    this._$gameWindow   = gameWindow;
    this._$gameCanvas   = gameCanvas;
    this._$ctx          = gameCanvas.getContext('2d');
    this._$isGameOver   = false;
    this._$lives        = 3;
    this._$ship         = {};
    this._$inputs       = {};

    this._initGameCanvas();
    this._initShip();
    this._initInputs();
  }

  // Public method
  start() {
    this._clearCanvas();
    this._draw();
    this._updateCoords();
    this._checkCollisions();
    if (!this.isGameOver) {
      this.gameWindow.requestAnimationFrame(() => this.start());
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

  get ship() {
    return this._$ship;
  }

  get inputs() {
    return this._$inputs;
  }

  // Private methods

  _initGameCanvas() {
    this._updateCanvasSize();
    this.gameWindow.addEventListener('resize', () => this._updateCanvasSize());
  }

  _initShip() {
    this.ship.width = 50;
    this.ship.height = 50;
    this.ship.x = 50;
    this.ship.y = (this.gameCanvas.height - this.ship.height) / 2 ;
    this.ship.dx = 20;
    this.ship.dy = 20;
  }

  _initInputs() {
    this.inputs.rightPressed = false;
    this.inputs.leftPressed = false;
    this.inputs.upPressed = false;
    this.inputs.downPressed = false;
    this.gameWindow.document.addEventListener('keydown', (e) => {
      console.log(e.key);
      if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.inputs.leftPressed = true;
      } else if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.inputs.rightPressed = true;
      } else if (e.key === 'Up' || e.key === 'ArrowUp') {
        this.inputs.upPressed = true;
      } else if (e.key === 'Down' || e.key === 'ArrowDown') {
        this.inputs.downPressed = true;
      }
    });
    this.gameWindow.document.addEventListener('keyup', (e) => {
      if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.inputs.leftPressed = false;
      } else if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.inputs.rightPressed = false;
      } else if (e.key === 'Up' || e.key === 'ArrowUp') {
        this.inputs.upPressed = false;
      } else if (e.key === 'Down' || e.key === 'ArrowDown') {
        this.inputs.downPressed = false;
      }
    });
  }

  _draw() {
    this._drawShip();
  }

  _drawShip() {
    this.ctx.beginPath();
    this.ctx.rect(this.ship.x, this.ship.y, this.ship.width, this.ship.height);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }
  
  _updateCanvasSize() {
    this.gameCanvas.height = this.gameWindow.innerHeight;
    this.gameCanvas.width = this.gameWindow.innerWidth;
  }

  _updateCoords() {
    this._updateShipCoords();
  }

  _updateShipCoords() {
    if (this.inputs.rightPressed && (this.ship.x + this.ship.width + this.ship.dx) <= this.gameCanvas.width) {
      this.ship.x += this.ship.dx;
    }
    if (this.inputs.leftPressed && (this.ship.x - this.ship.dx) >= 0) {
      this.ship.x -= this.ship.dx;
    }
    if (this.inputs.upPressed && (this.ship.y - this.ship.dy) >= 0) {
      this.ship.y -= this.ship.dy;
    }
    if (this.inputs.downPressed && (this.ship.y + this.ship.height + this.ship.dy) <= this.gameCanvas.height) {
      this.ship.y += this.ship.dy;
    }
  }

  _checkCollisions() {
/*    for (const brick of this.bricks) {
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
    }*/
  }

  _clearCanvas() {
    this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
  }
}
