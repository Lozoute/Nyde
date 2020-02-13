class GameObject {
    constructor() {
        if (this.constructor === GameObject){
            throw new TypeError('Abstract class "GameObject" cannot be instantiated directly');
        }
        if (this.draw === undefined) {
            throw new ImplementationMissingException(this.constructor, "draw");
        }
        if (this.update === undefined) {
            throw new ImplementationMissingException(this.constructor, "update");
        }
    }

}