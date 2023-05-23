const {ArrayBuffer} = require("../../src/array-buffer/array-buffer.struct");
const ArrayBufferSizing = require("../../src/array-buffer/array-buffer.sizing");

require("jest");

const testChunkIncrease = 5;
const testMaxOversize = 10;
const testStartCapacity = 10;
function initializeArrayBuffer() {
    return ArrayBufferSizing.initializeAll(testChunkIncrease, testMaxOversize, testStartCapacity);
}

test('Call initializeAll works as expected', () => {
    let arrayBuffer = initializeArrayBuffer();
    expect(arrayBuffer.chunkIncrease).toBe(testChunkIncrease);
    expect(arrayBuffer.maxOversize).toBe(testMaxOversize);
    expect(arrayBuffer.array.length).toBe(testStartCapacity);
});
