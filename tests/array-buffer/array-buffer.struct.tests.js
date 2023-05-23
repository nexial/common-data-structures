const {
    ArrayBuffer,
    ArrayBufferUtils
} = require("../../src/array-buffer/array-buffer.struct");

require("jest");

const testChunkIncrease = 10;
const testMaxOversize = testChunkIncrease * 2;
function getTestArrayBufferStructure() {
    let arrayBuffer = ArrayBuffer;
    arrayBuffer.chunkIncrease = testChunkIncrease;
    arrayBuffer.maxOversize = testMaxOversize;
    return arrayBuffer;
}

test('Set maxOversize Successfully', () => {
    let arrayBuffer = getTestArrayBufferStructure();
    // Ensuring maxOversize is greater than chunkIncrease but different by default testMaxOversize
    let maxOversize = testChunkIncrease + testMaxOversize;
    ArrayBufferUtils.setMaxOversize(maxOversize, arrayBuffer);
    expect(arrayBuffer.maxOversize).toBe(maxOversize);
});

test('Try to set a maxOversize lesser than chunkIncrease results in maxOversize = chunkIncrease', () => {
    let arrayBuffer = getTestArrayBufferStructure();
    // Ensuring maxOversize is lesser than chunkIncrease
    let maxOversize = testChunkIncrease - 1;
    ArrayBufferUtils.setMaxOversize(maxOversize, arrayBuffer);
    expect(arrayBuffer.maxOversize).toBe(testChunkIncrease);
});

test('Set chunkIncrease to a value lesser or equal than maxOversize, only chunkIncrease is changed accordingly and maxOversize stay the same', () => {
    // Ensuring maxOversize is greater than chunkIncrease but different by default testMaxOversize
    let arrayBuffer = getTestArrayBufferStructure();
    ArrayBufferUtils.setChunkIncrease(testMaxOversize, arrayBuffer);
    expect(arrayBuffer.chunkIncrease).toBe(testMaxOversize);
    expect(arrayBuffer.maxOversize).toBe(testMaxOversize);
    let chunkIncrease = Math.round(testMaxOversize / 2);
    ArrayBufferUtils.setChunkIncrease(chunkIncrease, arrayBuffer);
    expect(arrayBuffer.chunkIncrease).toBe(chunkIncrease);
    expect(arrayBuffer.maxOversize).toBe(testMaxOversize);
});

test('Set chunkIncrease to a value greater than maxOversize will set also maxOversize to the same value', () => {
    // Ensuring maxOversize is greater than chunkIncrease but different by default testMaxOversize
    let arrayBuffer = getTestArrayBufferStructure();
    let chunkIncrease = arrayBuffer.maxOversize + 1;
    ArrayBufferUtils.setChunkIncrease(chunkIncrease, arrayBuffer);
    expect(arrayBuffer.chunkIncrease).toBe(chunkIncrease);
    expect(arrayBuffer.maxOversize).toBe(chunkIncrease);
});

test('Trying to set a chunkIncrease value lesser equal than zero will result in chunkIncrease set to 1', () => {
    // Ensuring maxOversize is greater than chunkIncrease but different by default testMaxOversize
    let arrayBuffer = getTestArrayBufferStructure();
    ArrayBufferUtils.setChunkIncrease(0, arrayBuffer);
    expect(arrayBuffer.chunkIncrease).toBe(1);
    ArrayBufferUtils.setChunkIncrease(-1, arrayBuffer);
    expect(arrayBuffer.chunkIncrease).toBe(1);
});

test('Set both chunkIncrease and maxOversize in a single call will set both of them correctly', () => {
    // Ensuring maxOversize is greater than chunkIncrease but different by default testMaxOversize
    let arrayBuffer = getTestArrayBufferStructure();
    let chunkIncrease = testChunkIncrease * 2;
    let maxOversize = testMaxOversize * 3;
    ArrayBufferUtils.setChunkIncreaseAndMaxOversize(chunkIncrease, maxOversize, arrayBuffer);
    expect(arrayBuffer.chunkIncrease).toBe(chunkIncrease);
    expect(arrayBuffer.maxOversize).toBe(maxOversize);
});

test('Set both chunkIncrease and maxOversize in a single call with maxOversize lesser than chunkIncrease will result in both having chunkIncrease value', () => {
    // Ensuring maxOversize is greater than chunkIncrease but different by default testMaxOversize
    let arrayBuffer = getTestArrayBufferStructure();
    let chunkIncrease = testChunkIncrease * 2;
    ArrayBufferUtils.setChunkIncreaseAndMaxOversize(chunkIncrease, chunkIncrease - 1, arrayBuffer);
    expect(arrayBuffer.chunkIncrease).toBe(chunkIncrease);
    expect(arrayBuffer.maxOversize).toBe(chunkIncrease);
});

test('Try to set both chunkIncrease and maxOversize in a single call with chunkIncrease lesser equal than zero will result in chunkIncrease set to 1 and maxOversize set to the wanted value', () => {
    // Ensuring maxOversize is greater than chunkIncrease but different by default testMaxOversize
    let arrayBuffer = getTestArrayBufferStructure();
    let maxOversize = testMaxOversize * 3;
    ArrayBufferUtils.setChunkIncreaseAndMaxOversize(0, maxOversize, arrayBuffer);
    expect(arrayBuffer.chunkIncrease).toBe(1);
    expect(arrayBuffer.maxOversize).toBe(maxOversize);
    ArrayBufferUtils.setChunkIncreaseAndMaxOversize(-1, maxOversize, arrayBuffer);
    expect(arrayBuffer.chunkIncrease).toBe(1);
    expect(arrayBuffer.maxOversize).toBe(maxOversize);
});

test('Try to set both chunkIncrease and maxOversize in a single call with chunkIncrease and maxOversize lesser equal than zero will result in both of them set to 1', () => {
    // Ensuring maxOversize is greater than chunkIncrease but different by default testMaxOversize
    let arrayBuffer = getTestArrayBufferStructure();
    ArrayBufferUtils.setChunkIncreaseAndMaxOversize(0, -1, arrayBuffer);
    expect(arrayBuffer.chunkIncrease).toBe(1);
    expect(arrayBuffer.maxOversize).toBe(1);
    ArrayBufferUtils.setChunkIncreaseAndMaxOversize(-1, 0, arrayBuffer);
    expect(arrayBuffer.chunkIncrease).toBe(1);
    expect(arrayBuffer.maxOversize).toBe(1);
});

test('Validate newly instanced arrayBuffer has zero usedLength and that is considered properly by isEmpty', () => {
    // Ensuring maxOversize is greater than chunkIncrease but different by default testMaxOversize
    let arrayBuffer = getTestArrayBufferStructure();
    expect(arrayBuffer.usedLength).toBe(0);
    expect(ArrayBufferUtils.isEmpty(arrayBuffer)).toBeTruthy();
});

test('Validate newly instanced arrayBuffer has both startIndex and endIndex properly set to zero', () => {
    // Ensuring maxOversize is greater than chunkIncrease but different by default testMaxOversize
    let arrayBuffer = getTestArrayBufferStructure();
    expect(arrayBuffer.startIndex).toBe(0);
    expect(arrayBuffer.endIndex).toBe(0);
});

test('Validate for a newly instanced arrayBuffer isValidIndex will give always false (because empty)', () => {
    // Ensuring maxOversize is greater than chunkIncrease but different by default testMaxOversize
    let arrayBuffer = getTestArrayBufferStructure();
    expect(ArrayBufferUtils.isValidIndex(Number.MIN_VALUE, arrayBuffer)).toBeFalsy();
    expect(ArrayBufferUtils.isValidIndex(-1, arrayBuffer)).toBeFalsy();
    expect(ArrayBufferUtils.isValidIndex(0, arrayBuffer)).toBeFalsy();
    expect(ArrayBufferUtils.isValidIndex(+1, arrayBuffer)).toBeFalsy();
    expect(ArrayBufferUtils.isValidIndex(Number.MAX_VALUE, arrayBuffer)).toBeFalsy();
});

