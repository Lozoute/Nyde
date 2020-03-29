class PolygonCollider {
    constructor(polygon) {
        this._$polygon = polygon;
    }

    // Getters
    get vertices() {
        return this._$polygon.vertices;
    }

    checkCollision(otherCollider) {
        for (let i = 0; i < this.vertices.length; i++) {
            const pointA = this.vertices[i];
            const pointB = this.vertices[(i + 1) % this.vertices.length];
            const line = {x: pointA.x, y: pointA.y, m: (pointA.x === pointB.x ? NaN : (pointA.y - pointB.y) / (pointA.x - pointB.x)), b: 0}; // y = mx + b (b = 0 here to ease things)
            const thisProjectedShadow = this.projectVerticesOnLine(line);
            const otherProjectedShadow = otherCollider.projectVerticesOnLine(line);
            if (!this._isOnVector(thisProjectedShadow.origin, otherProjectedShadow) &&
                !this._isOnVector(otherProjectedShadow.origin, thisProjectedShadow) &&
                !this._isOnVector(thisProjectedShadow.dest, otherProjectedShadow) &&
                !this._isOnVector(otherProjectedShadow.dest, thisProjectedShadow))
                    return false;
        }
        return true;
    }

    projectVerticesOnLine(line) {
        return this.vertices.reduce((segment, point) => {
            const projectedPoint = this._projectPointOnLine(point, line);
            if (segment === null)
                return new Vector2d(projectedPoint, projectedPoint);
            const longest = [
                segment,
                new Vector2d(segment.origin, projectedPoint),
                new Vector2d(segment.dest, projectedPoint)
            ].reduce((prev, curr) => {
                return prev.size > curr.size ? prev : curr;
            });
            return longest;
        }, null);
    }

    // Private
    _isOnVector(point, vector) {
        return this._isBetween(point.x, [vector.origin.x, vector.dest.x]) && this._isBetween(point.y, [vector.origin.y, vector.dest.y]);
    }

    _isBetween(num, range) {
        const min = Math.min(...range);
        const max = Math.max(...range);
        return num >= min && num <= max;
    }

    // Return the intersection between the line and its perpendicular line passing by point
    // Line equation : y = m * x + b
    _projectPointOnLine(point, line) {
        if (line.m === 0) // horizontal line
            return new Point(point.x, line.y);
        else if (Number.isNaN(line.m)) // vertical line
            return new Point(line.x, point.y);
        // lines are perpendicular so m1 * m2 == -1
        // then m2 = -1 / m1
        const pM = -1.0 / line.m;
        // Perpendicular line pass by point, so we can find b by replacing x, y and m by the values we got
        // y = m * x + b <=> b = y - m * x
        const pB = point.y - pM * point.x;
        const perpendicularLine = {y: point.y, x: point.x, m: pM, b: pB};
        // We look for the point I(iX, iY) that belong to line and perpendicularLine,
        // so iX where m * iX + b == pM * iX + pB
        // => iX = (b - pB) / (pM - m)
        // and iY = pM * iX + pB (or iY = m * iX + b)
        const iX = (line.b - perpendicularLine.b) / (perpendicularLine.m - line.m);
        const iY = line.m * iX + line.b;
        return new Point(iX, iY);
    }
}