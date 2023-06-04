const {ArrayBuffer} = require("../../src/array-buffer/array-buffer.struct");
class ArrayBufferSizing {
    static initializeAll(capacity, chunkIncrease, maxOversize) {
        let arrayBuffer = ArrayBuffer;
        ArrayBufferSizing.setChunkIncreaseAndMaxOversize(chunkIncrease, maxOversize, arrayBuffer);
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
        arrayBuffer.fill(undefined, arrayBuffer.endIndex + 1, Math.min(arrayBuffer.higherUsedIndex, value));
    }
    static checkForBufferOversize(arrayBuffer, appendEmptyChunk) {
        if ((arrayBuffer.array.length - arrayBuffer.size) > arrayBuffer.maxOversize) {
            let newCapacity = (appendEmptyChunk ? arrayBuffer.size + arrayBuffer.chunkIncrease : arrayBuffer.size);
            ArrayBufferSizing.minimizeCapacity(newCapacity);
        }
    }
    static setChunkIncreaseAndMaxOversize(valueChunkIncrease, valueMaxOversize, arrayBuffer) {
        arrayBuffer.chunkIncrease = Math.max(valueChunkIncrease, 1);
        ArrayBufferSizing.setMaxOversize(valueMaxOversize, arrayBuffer);
    }
    static setChunkIncrease(value, arrayBuffer) {
        ArrayBufferSizing.setChunkIncreaseAndMaxOversize(value, arrayBuffer.maxOversize, arrayBuffer);
    }
    static setMaxOversize(value, arrayBuffer) {
        arrayBuffer.maxOversize = Math.max(value, arrayBuffer.chunkIncrease);
        ArrayBufferSizing.checkForBufferOversize(arrayBuffer, false);
    }

    static updateBufferForAppendAtTheEndItems(itemsToAppendCount, arrayBuffer) {
        arrayBuffer.endIndex += itemsToAppendCount;
        arrayBuffer.higherUsedIndex = Math.max(arrayBuffer.higherUsedIndex, arrayBuffer.endIndex);
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
    static clearUnusedReferences(arrayBuffer) {
        arrayBuffer.array.fill(undefined, 0, arrayBuffer.startIndex - 1);
        arrayBuffer.fill(undefined, arrayBuffer.endIndex + 1, arrayBuffer.higherUsedIndex);
        arrayBuffer.higherUsedIndex = arrayBuffer.endIndex;
    }
    static clear(arrayBuffer, capacity = 0) {
        arrayBuffer.startIndex = 0;
        arrayBuffer.endIndex = 0;
        capacity = Math.min(capacity, arrayBuffer.maxOversize);
        arrayBuffer.array.length = capacity;
        arrayBuffer.array.fill(undefined, 0, Math.min(capacity, arrayBuffer.higherUsedIndex));
        arrayBuffer.higherUsedIndex = 0;
    }
}

module.exports = ArrayBufferSizing;
