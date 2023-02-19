"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../../models/book");
const store = new book_1.bookStore();
let bookid;
describe("book model ", () => {
    it("should have an index methode", () => {
        expect(store.index).toBeDefined();
    });
    it('index should return all books ', async () => {
        const result = await store.index();
        expect(result).toBeDefined;
    });
    it("should have a create methode", () => {
        expect(store.create).toBeDefined();
    });
    it('create should create a book ', async () => {
        const book = {
            id: 0,
            name: "test_book",
            price: 12,
            category: 0,
        };
        const result = await store.create(book);
        const categ = result.category.toString();
        expect(result.name).toEqual("test_book");
        expect(categ).toEqual("Comedy");
        bookid = result.id;
    });
    it("should have a show methode", () => {
        expect(store.show).toBeDefined();
    });
    it('show should return a book ', async () => {
        const result = await store.show(bookid);
        expect(result.name).toEqual("test_book");
    });
});
