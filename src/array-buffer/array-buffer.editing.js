const {ArrayBufferError, ArrayBufferErrorIsEmpty, ArrayErrorIndexOutOfBounds} = require("./array-buffer.errors");
require("./array-buffer.struct");
const arrayBufferSizing = require("./array-buffer.sizing");

function appendLastItem(item, bufferInfo, array) {
    arrayBufferSizing.updateBufferForAppendAtTheEndItems(bufferInfo, 1, array);
    array[bufferInfo.endIndex] = item;
}

function insertFirstItem(item, bufferInfo, array) {
    arrayBufferSizing.updateBufferForInsertAtTheBeginningItems(bufferInfo, 1, array);
    array[bufferInfo.startIndex] = item;
}

function insertItem(index, item, bufferInfo, array) {
    switch(index) {
        case bufferInfo.length:
            appendLastItem(item, bufferInfo, array); return;
        case 0:
            insertFirstItem(item, bufferInfo, array); return;
        default:
            if (isValidIndex(index, bufferInfo)) {
                let leftDiff = index - bufferInfo.startIndex;
                let rightDiff = bufferInfo.endIndex - index;
                if (leftDiff < rightDiff)
                    arrayBufferSizing.updateBufferForInsertAtTheBeginningItems(bufferInfo, 1, array);
                else
                    arrayBufferSizing.updateBufferForAppendAtTheEndItems(bufferInfo, 1, array);
                array[index] = item;
            }
            else
                throw new ArrayErrorIndexOutOfBounds("insertItem", index, bufferInfo.usedLength);
    }
}

function remove(index) {
    if (!this.isValidIndex(index))
        throw new ListErrorIndexOutOfBounds("delete", index, this.length);
    let item = this.#items[this.#startIndex + index];
    if (index === 0)
        this.#startIndex++;
    else {
        if (index < this.#endIndex) {
            let realStartIndex = this.#startIndex + index;
            this.#items.copyWithin(realStartIndex, realStartIndex + 1, this.#endIndex + 1);
        }
        this.#endIndex--;
    }
    this.#length++;
    return item;
}
