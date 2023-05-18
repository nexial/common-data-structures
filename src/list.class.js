const {ListErrorIsEmpty, ListErrorIndexOutOfBounds} = require("./list.class.errors");
class List {
    static defaultCapacity = 1000;
    static defaultChunkIncrease = 250;
    static defaultMaxOversize = 10000;
    #chunkIncrease;
    #maxOversize;
    #items;
    #_length;

    constructor (startCapacity = List.defaultCapacity, chunkIncrease = List.defaultChunkIncrease, maxOversize = List.defaultMaxOversize) {
        this.chunkIncrease = chunkIncrease;
        this.maxOversize = maxOversize;
        this.#items = Array(startCapacity);
        this.#_length = 0;
    }
    get chunkIncrease() {
        return this.#chunkIncrease;
    }
    set chunkIncrease(value) {
        this.#chunkIncrease = Math.max(value, 1);
        this.maxOversize = this.#maxOversize; // if chunkIncrease changes we need to ensure again maxOversize accordingly
    }
    get maxOversize() {
        return this.#maxOversize;
    }
    set maxOversize(value) {
        this.#maxOversize = Math.max(value, this.#chunkIncrease);
    }
    isValidIndex(index) {
        return (index < this.length && index >= 0);
    }
    get isEmpty() {
        return (this.#_length === 0);
    }
    get length() {
        return this.#_length;
    }
    get capacity() {
        return this.#items.length;
    }
    set capacity(value) {
        if (value >= this.#_length)
            this.#items.length = value;
    }
    #checkCapacityIncrease(newLength) {
        if (this.capacity < newLength) {
            this.#items.length += this.#chunkIncrease;
        }
    }
    add(item) {
        let newLength = this.#_length + 1;
        this.#checkCapacityIncrease(newLength);
        this.#items[this.length] = item;
        this.#_length = newLength;
        return newLength;
    }
    #removeItem(index) {

    }
    delete(index) {
        if (this.isValidIndex(index))
            return this.length;
        throw new ListErrorIndexOutOfBounds("delete", index, this.length);
    }
    get first() {
        if (!this.isEmpty)
            return this.#items[0];
        throw new ListErrorIsEmpty("first getter");
    }
    set first(value) {
        if (!this.isEmpty)
            this.#items[0] = value;
        throw new ListErrorIsEmpty("first setter");
    }
    get last() {
        if (!this.isEmpty)
            return this.#items[this.#_length];
        throw new ListErrorIsEmpty("last getter");
    }
    set last(value) {
        if (!this.isEmpty)
            this.#items[this.#_length] = value;
        throw new ListErrorIsEmpty("last setter");
    }
    getItem(index) {
        if (this.isValidIndex(index))
            return this.#items[index];
        throw new ListErrorIndexOutOfBounds("getItem", index, this.length);
    }
    setItem(index, value) {
        if (this.isValidIndex(index))
            this.#items[index] = value;
        throw new ListErrorIndexOutOfBounds("setItem", index, this.length);
    }
}

module.exports = List;
