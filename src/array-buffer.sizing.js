require("./array-buffer.info-struct");

function setCapacity(value, bufferInfo, array) {
    if (value > (bufferInfo.endIndex + 1) && value <= (bufferInfo.usedLength + bufferInfo.maxOversize))
        array.length = value;
    else {
        let newCapacity = Math.max(value, bufferInfo.usedLength);
        minimizeCapacity(newCapacity, bufferInfo, array);
    }
}
function minimizeCapacity(value, bufferInfo, array) {
    array.copyWithin(0, bufferInfo.startIndex, bufferInfo.endIndex + 1)
    array.length = value;
    bufferInfo.startIndex = 0;
    bufferInfo.endIndex = bufferInfo.usedLength - 1;
}
function checkForBufferOversize(bufferInfo, array, appendEmptyChunk) {
    if ((array.length - bufferInfo.usedLength) > bufferInfo.maxOversize) {
        let newCapacity = (appendEmptyChunk ? bufferInfo.usedLength + bufferInfo.chunkIncrease : bufferInfo.usedLength);
        minimizeCapacity(newCapacity);
    }
}
function updateBufferForAppendAtTheEndItems(bufferInfo, itemsToAppendCount, array) {
    bufferInfo.endIndex += itemsToAppendCount;
    bufferInfo.usedLength += itemsToAppendCount;
    if ((bufferInfo.endIndex + 1) > array.length) {
        let sizeIncrease = Math.ceil(bufferInfo.chunkIncrease / itemsToAppendCount) * bufferInfo.chunkIncrease;
        array.length += sizeIncrease;
        checkForBufferOversize(bufferInfo, array, true);
    }
}
function updateBufferForInsertAtTheBeginningItems(bufferInfo, itemsToInsertCount, array) {
    bufferInfo.usedLength += itemsToInsertCount;
    if (bufferInfo.startIndex >= itemsToInsertCount)
        bufferInfo.startIndex = bufferInfo.startIndex - itemsToInsertCount;
    else {
        let itemsToAppendCount = itemsToInsertCount - bufferInfo.startIndex;
        let newEndIndex = bufferInfo.endIndex + itemsToAppendCount;
        if ((newEndIndex + 1) > array.length) {
            let sizeIncrease = Math.ceil(bufferInfo.chunkIncrease / itemsToAppendCount) * bufferInfo.chunkIncrease;
            array.length += sizeIncrease;
        }
        array.copyWithin(itemsToInsertCount, bufferInfo.startIndex, bufferInfo.endIndex + 1)
        bufferInfo.endIndex = newEndIndex;
        bufferInfo.startIndex = 0;
    }
}


module.exports = {updateBufferForAppendAtTheEndItems, updateBufferForInsertAtTheBeginningItems}

