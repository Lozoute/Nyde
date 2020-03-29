class Vector2d {
    constructor(origin, dest) {
        this._$origin = origin;
        this._$dest = dest;
        this._$dx = dest.x - origin.x;
        this._$dy = dest.y - origin.y;
        this._$size = Math.sqrt(Math.pow(this._$dx, 2) + Math.pow(this._$dy, 2));
    }

    //Getters
    get origin() { return this._$origin; }
    get dest() { return this._$dest; }
    get size() { return this._$size; }

    apply(point) {
        return new Point(point.x + this._$dx, point.y + this._$dy);
    }
}