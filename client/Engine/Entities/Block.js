class Block extends Polygon
{
    constructor(position, size)
    {
        super(position, [
            new Vector2d(Point.zero(), new Point(-size.x / 2, size.y / 2)),
            new Vector2d(Point.zero(), new Point(size.x / 2, size.y / 2)),
            new Vector2d(Point.zero(), new Point(size.x / 2, -size.y / 2)),
            new Vector2d(Point.zero(), new Point(-size.x / 2, -size.y / 2))
        ]);
        this._$collider = new PolygonCollider(this);
        this._$collider.collide = () => this.colliding();
        new CollisionManager().addCollider(this._$collider);
    }

    colliding() {
        console.warn("COLLIDING");
    }
}