const {ListErrorIsEmpty, ListErrorIndexOutOfBounds} = require("./array-buffer.errors");
class List {
    static defaultCapacity = 1000;
    static defaultChunkIncrease = 250;
    static defaultMaxOversize = 10000;
    #chunkIncrease;
    #maxOversize;
    #items;
    #length;
    #startIndex;
    #endIndex;

    constructor (startCapacity = List.defaultCapacity, chunkIncrease = List.defaultChunkIncrease, maxOversize = List.defaultMaxOversize) {
        this.chunkIncrease = chunkIncrease;
        this.maxOversize = maxOversize;
        this.#items = Array(startCapacity);
        this.#length = 0;
        this.#startIndex = 0;
        this.#endIndex = 0;
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
        return (index < this.#length && index >= 0);
    }
    get isEmpty() {
        return (this.#length === 0);
    }
    get length() {
        return this.#length;
    }
    get capacity() {
        return this.#items.length;
    }
    set capacity(value) {
        if (value > this.#endIndex) {
            value = Math.min(value, (this.#length + this.#maxOversize));
            this.#items.length = value;
        }
        else
            this.minimizeCapacity(value);
    }
    minimizeCapacity(value) {
        value = Math.max(value, this.#chunkIncrease, this.length);
        this.#items.copyWithin(0, this.#startIndex, this.#endIndex + 1)
        this.#items.length = value;
        this.#startIndex = 0;
        this.#endIndex = this.length - 1;
    }
    insert(index, item) {
        if (!this.isValidIndex(index)) {
            if (index === this.#items.length)
                this.append(item);
            else
                throw new ListErrorIndexOutOfBounds("insert", index, this.length);
        }
    }
    append(item) {
        if (this.#endIndex === this.#items.length)
            this.capacity += this.#chunkIncrease;
        this.#endIndex++;
        this.#items[this.#endIndex] = item;
        return this.#length++ - 1;
    }
    remove(index) {
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
    get first() {
        if (this.isEmpty)
            throw new ListErrorIsEmpty("first getter");
        return this.#items[this.#startIndex];
    }
    set first(value) {
        if (this.isEmpty)
            throw new ListErrorIsEmpty("first setter");
        this.#items[this.#startIndex] = value;
    }
    get last() {
        if (this.isEmpty)
            throw new ListErrorIsEmpty("last getter");
        return this.#items[this.#endIndex];
    }
    set last(value) {
        if (this.isEmpty)
            throw new ListErrorIsEmpty("last setter");
        this.#items[this.#endIndex] = value;
    }
    getItem(index) {
        if (this.isValidIndex(index))
            return this.#items[this.#startIndex + index];
        throw new ListErrorIndexOutOfBounds("getItem", index, this.length);
    }
    setItem(index, value) {
        if (this.isValidIndex(index))
            this.#items[this.#startIndex + index] = value;
        throw new ListErrorIndexOutOfBounds("setItem", index, this.length);
    }
}

module.exports = List;
