const List = require("../src/list.class.js")
require("jest");

test('Create new List instance successfully', () => {
    expect(new List()).not.toBeNull();
});

test('New instance is empty', () => {
    expect(new List().isEmpty).toBeTruthy();
});

test('New instance has expected default capacity', () => {
    expect(new List().capacity).toBe(List.defaultCapacity);
});

test('New instance has expected default chunk increase', () => {
    let list = new List();
    list[1] = 5;
    expect(list.getItem(1)).toBe(5);
});
