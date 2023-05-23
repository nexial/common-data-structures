const defaultBufferStartCapacity = 1000;
const defaultBufferChunkIncrease = 250;
const defaultBufferMaxOversize = 10000;

const ArrayBuffer = {
    chunkIncrease : defaultBufferChunkIncrease,
    maxOversize : defaultBufferMaxOversize,
    startIndex : 0,
    endIndex : 0,
    usedLength : 0,
    array: []
}

class ArrayBufferUtils {
    static setChunkIncreaseAndMaxOversize(valueChunkIncrease, valueMaxOversize, arrayBuffer) {
        arrayBuffer.chunkIncrease = Math.max(valueChunkIncrease, 1);
        ArrayBufferUtils.setMaxOversize(valueMaxOversize, arrayBuffer);
    }
    static setChunkIncrease(value, arrayBuffer) {
        ArrayBufferUtils.setChunkIncreaseAndMaxOversize(value, arrayBuffer.maxOversize, arrayBuffer);
    }
    static setMaxOversize(value, arrayBuffer) {
        arrayBuffer.maxOversize = Math.max(value, arrayBuffer.chunkIncrease);
    }
    static isEmpty(arrayBuffer) {
        return (arrayBuffer.usedLength === 0);
    }
    static getLength(arrayBuffer) {
        return arrayBuffer.usedLength;
    }
    static isValidIndex(index, arrayBuffer) {
        return (index < arrayBuffer.usedLength && index >= 0);
    }
}

module.exports = {
    defaultBufferStartCapacity,
    defaultBufferChunkIncrease,
    defaultBufferMaxOversize,
    ArrayBuffer,
    ArrayBufferUtils
}
