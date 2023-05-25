const {
    ArrayBuffer,
    ArrayBufferUtils
} = require("../../src/array-buffer/array-buffer.struct");
class ArrayBufferSizing {
    static initializeAll(chunkIncrease, maxOversize, capacity) {
        let arrayBuffer = ArrayBuffer;
        ArrayBufferUtils.setChunkIncreaseAndMaxOversize(chunkIncrease, maxOversize, arrayBuffer);
        arrayBuffer.array = Array(capacity);
        return arrayBuffer;
    }
    static setCapacity(value, arrayBuffer) {
        if (value > (arrayBuffer.endIndex + 1))
            arrayBuffer.array.length = value;
        else {
            let newCapacity = Math.max(value, arrayBuffer.size);
            ArrayBufferSizing.minimizeCapacity(newCapacity, arrayBuffer);
        }
        // If explicitly required new capacity generates a greater oversize than current maxOversize this latter needs to be increased accordingly
        arrayBuffer.maxOversize = Math.max(arrayBuffer.array.length - arrayBuffer.size, arrayBuffer.maxOversize);
    }
    static minimizeCapacity(value, arrayBuffer) {
        arrayBuffer.array.copyWithin(0, arrayBuffer.startIndex, arrayBuffer.endIndex + 1)
        arrayBuffer.array.length = value;
        arrayBuffer.startIndex = 0;
        arrayBuffer.endIndex = arrayBuffer.size - 1;
    }
    static checkForBufferOversize(arrayBuffer, appendEmptyChunk) {
        if ((arrayBuffer.array.length - arrayBuffer.size) > arrayBuffer.maxOversize) {
            let newCapacity = (appendEmptyChunk ? arrayBuffer.size + arrayBuffer.chunkIncrease : arrayBuffer.size);
            ArrayBufferSizing.minimizeCapacity(newCapacity);
        }
    }
    static updateBufferForAppendAtTheEndItems(itemsToAppendCount, arrayBuffer) {
        arrayBuffer.endIndex += itemsToAppendCount;
        arrayBuffer.size += itemsToAppendCount;
        if ((arrayBuffer.endIndex + 1) > arrayBuffer.array.length) {
            let sizeIncrease = Math.ceil(arrayBuffer.chunkIncrease / itemsToAppendCount) * arrayBuffer.chunkIncrease;
            arrayBuffer.array.length += sizeIncrease;
            ArrayBufferSizing.checkForBufferOversize(arrayBuffer, true);
        }
    }
    static updateBufferForInsertAtTheBeginningItems(itemsToInsertCount, arrayBuffer) {
        arrayBuffer.size += itemsToInsertCount;
        if (arrayBuffer.startIndex >= itemsToInsertCount)
            arrayBuffer.startIndex = arrayBuffer.startIndex - itemsToInsertCount;
        else {
            let itemsToAppendCount = itemsToInsertCount - arrayBuffer.startIndex;
            let newEndIndex = arrayBuffer.endIndex + itemsToAppendCount;
            if ((newEndIndex + 1) > arrayBuffer.array.length) {
                let sizeIncrease = Math.ceil(arrayBuffer.chunkIncrease / itemsToAppendCount) * arrayBuffer.chunkIncrease;
                arrayBuffer.array.length += sizeIncrease;
            }
            arrayBuffer.array.copyWithin(itemsToInsertCount, arrayBuffer.startIndex, arrayBuffer.endIndex + 1)
            arrayBuffer.endIndex = newEndIndex;
            arrayBuffer.startIndex = 0;
        }
    }
}

module.exports = ArrayBufferSizing;
