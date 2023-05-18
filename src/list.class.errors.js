class ListError extends Error {
    constructor(methodName, errorReason) {
        super(`Error! List.${methodName}, ${errorReason}`);
    }
}
class ListErrorIsEmpty extends ListError {
    constructor(methodName) {
        super(methodName, "list is empty.");
    }
}
class ListErrorIndexOutOfBounds extends ListError {
    constructor(methodName, index, length) {
        super(methodName, `index out of bounds. Index: ${index}, Length: ${length}.`);
    }
}

module.exports = {ListError, ListErrorIsEmpty, ListErrorIndexOutOfBounds}
