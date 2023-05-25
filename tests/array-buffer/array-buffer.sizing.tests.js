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

test('Change capacity to a value that do not lose elements works', () => {
    let arrayBuffer = initializeArrayBuffer();
    let capacity = Math.ceil(testStartCapacity / 2);
    ArrayBufferSizing.setCapacity(capacity, arrayBuffer);
    expect(arrayBuffer.array.length).toBe(capacity);
});

test('Change capacity to a value that lesser or equal than endIndex with startIndex = 0 will result in Capacity equal to size', () => {
    let arrayBuffer = initializeArrayBuffer();
    arrayBuffer.endIndex = Math.ceil(testStartCapacity / 2);
    arrayBuffer.size = arrayBuffer.endIndex + 1;
    let capacity = arrayBuffer.endIndex;
    ArrayBufferSizing.setCapacity(capacity, arrayBuffer);
    expect(arrayBuffer.array.length).toBe(arrayBuffer.size);
});

test('Change capacity to a value that lesser than size will result in Capacity equal to size and buffer shifted for starting from zero as startIndex', () => {
    let arrayBuffer = initializeArrayBuffer();
    arrayBuffer.array.length = 50; // current capacity
    let endIndex = 12;
    let startIndex = 2;
    let size = endIndex - startIndex + 1;
    arrayBuffer.endIndex = endIndex;
    arrayBuffer.startIndex = startIndex;
    arrayBuffer.size = size;
    let capacity = arrayBuffer.size - 1;
    ArrayBufferSizing.setCapacity(capacity, arrayBuffer);
    expect(arrayBuffer.array.length).toBe(arrayBuffer.size);
    expect(arrayBuffer.startIndex).toBe(0);
    expect(arrayBuffer.endIndex).toBe(arrayBuffer.size - 1);
});

test('Change capacity to a value which will let MORE unused cells than current maxOversize WILL increase this latter one accordingly', () => {
    let arrayBuffer = initializeArrayBuffer();
    arrayBuffer.array.length = 10; // current capacity
    arrayBuffer.endIndex = 4;
    arrayBuffer.size = arrayBuffer.endIndex + 1; // 5
    let newMaxOversize = arrayBuffer.maxOversize * 2;
    let capacity = arrayBuffer.size + newMaxOversize; // ensuring requiring new capacity which will generate more empty cells than current maxOversize
    ArrayBufferSizing.setCapacity(capacity, arrayBuffer);
    expect(arrayBuffer.array.length).toBe(capacity);
    expect(arrayBuffer.maxOversize).toBe(newMaxOversize);
});

test('Change capacity to a value which will let LESS unused cells than current maxOversize WILL NOT affect maxOversize', () => {
    let arrayBuffer = initializeArrayBuffer();
    arrayBuffer.array.length = 10; // current capacity
    arrayBuffer.endIndex = 4;
    arrayBuffer.size = arrayBuffer.endIndex + 1; // 5
    let originalMaxOversize = arrayBuffer.maxOversize;
    let capacity = arrayBuffer.size + Math.ceil(originalMaxOversize / 2); // ensuring requiring new capacity which will generate less empty cells than current maxOversize
    ArrayBufferSizing.setCapacity(capacity, arrayBuffer);
    expect(arrayBuffer.array.length).toBe(capacity);
    expect(arrayBuffer.maxOversize).toBe(originalMaxOversize);
});
