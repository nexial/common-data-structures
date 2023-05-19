const defaultBufferStartCapacity = 1000;
const defaultBufferChunkIncrease = 250;
const defaultBufferMaxOversize = 10000;

const BufferInfo = {
    chunkIncrease : defaultBufferChunkIncrease,
    maxOversize : defaultBufferMaxOversize,
    startIndex : 0,
    endIndex : 0,
    usedLength : 0
}

function setChunkIncreaseAndMaxOversize(valueChunkIncrease, valueMaxOversize, bufferInfo) {
    bufferInfo.chunkIncrease = Math.max(valueChunkIncrease, 1);
    setMaxOversize(valueMaxOversize, bufferInfo);
}
function setChunkIncrease(value, bufferInfo) {
    setChunkIncreaseAndMaxOversize(value, bufferInfo.maxOversize, bufferInfo);
}
function setMaxOversize(value, bufferInfo) {
    bufferInfo.maxOversize = Math.max(value, bufferInfo.chunkIncrease);
}
function isEmpty(bufferInfo) {
    return (bufferInfo.usedLength === 0);
}
function getLength(bufferInfo) {
    return bufferInfo.usedLength;
}
function isValidIndex(index, bufferInfo) {
    return (index < bufferInfo.usedLength && index >= 0);
}

module.exports = BufferInfo;
