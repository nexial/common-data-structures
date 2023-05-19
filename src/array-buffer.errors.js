class ArrayBufferError extends Error {
    constructor(callerName, errorReason) {
        super(`Buffer error! Calling ${callerName}, reason: ${errorReason}`);
    }
}
class ArrayBufferErrorIsEmpty extends ArrayBufferError {
    constructor(callerName) {
        super(callerName, "buffer is empty.");
    }
}
class ArrayErrorIndexOutOfBounds extends ArrayBufferError {
    constructor(callerName, index, length) {
        super(callerName, `index out of bounds. Index: ${index}, Length: ${length}.`);
    }
}

module.exports = {ArrayBufferError, ArrayBufferErrorIsEmpty, ArrayErrorIndexOutOfBounds}
