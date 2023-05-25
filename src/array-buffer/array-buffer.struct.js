const defaultBufferStartCapacity = 1000;
const defaultBufferChunkIncrease = 250;
const defaultBufferMaxOversize = 10000;

const ArrayBuffer = {
    chunkIncrease : defaultBufferChunkIncrease,
    maxOversize : defaultBufferMaxOversize,
    startIndex : 0,
    endIndex : 0,
    size : 0,
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
        return (arrayBuffer.size === 0);
    }
    static getSize(arrayBuffer) {
        return arrayBuffer.size;
    }
    static isValidIndex(index, arrayBuffer) {
        return (index < arrayBuffer.size && index >= 0);
    }
}

module.exports = {
    defaultBufferStartCapacity,
    defaultBufferChunkIncrease,
    defaultBufferMaxOversize,
    ArrayBuffer,
    ArrayBufferUtils
}
