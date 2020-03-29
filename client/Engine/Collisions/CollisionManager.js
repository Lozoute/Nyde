class CollisionManager {
    constructor() {
        if (!CollisionManager._$instance) {
            this._$colliders = [];
            CollisionManager._$instance = this;
        }
        return CollisionManager._$instance;
    }

    addCollider(collider) {
        this._$colliders.push(collider);
    }

    checkCollisions() {
        for (let i = 0; i < this._$colliders.length - 1; i++) {
            for (let j = i + 1; j < this._$colliders.length; j++) {
                var colliderA = this._$colliders[i];
                var colliderB = this._$colliders[j];
                if (colliderA.checkCollision(colliderB) && colliderB.checkCollision(colliderA)) {
                    console.warn("colliding");
                    colliderA.collide();
                    colliderB.collide();
                }
            }
        }
    }
}