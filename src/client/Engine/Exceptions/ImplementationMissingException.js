class ImplementationMissingException extends Error {
    constructor(object, memberName) {
        super.contructor(`${object} does not implement ${memberName} member`);
    }
}