class Ball extends GameObject {
    constructor(position, radius) {
        super();
        this._$initialPosition = position;
        this._$direction = {x: 1, y: 1};
        this._$speed = 5;
        this._$position = position;
        this._$radius = radius;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this._moveBall();
        this._updateDirection();
    }

    //Getters
    get initialPosition() {
        return this._$initialPosition;
    }

    get position() {
        return this._$position;
    }

    get radius() {
        return this._$radius;
    }

    get direction() {
        return this._$direction;
    }

    get speed() {
        return this._$speed;
    }

    //Private methods
    _moveBall() {
        this._$position = {
            x: this.position.x + (this.direction.x * this.speed),
            y: this.position.y + (this.direction.y * this.speed)
        };
    }

    _updateDirection() {
        if (this.position.x >= 460 || this.position.x <= 20) {
            this._$direction.x *= -1;
        }
        if (this.position.y >= 300 || this.position.y <= 20) {
            this._$direction.y *= -1;
        } 
    }
}