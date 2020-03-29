class Point {
    constructor(x, y) {
        this._$x = x;
        this._$y = y;
    }

    // Getters
    get x() {
        return this._$x;
    }

    get y() {
        return this._$y;
    }

    // Special constructor
    static zero() {
        return new Point(0, 0);
    }
}

