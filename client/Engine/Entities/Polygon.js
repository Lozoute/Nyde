class Polygon extends GameObject {
    constructor(position, vectorsToVertices) {
        super(position);
        this._$vectorsToVertices = vectorsToVertices;
        this.update();
    }

    draw(ctx) {
        const firstV = this.vertices[0];
        ctx.fillStyle = '#0095DD';
        ctx.beginPath();
        ctx.moveTo(firstV.x, firstV.y);
        for (let it = 1; it < this.vertices.length; it++) {
            const v = this.vertices[it];
            ctx.lineTo(v.x, v.y);
        }
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this._$vertices = this._$vectorsToVertices.map(v => v.apply(this.position));
    }

    get vertices() {
        return this._$vertices;
    }
}