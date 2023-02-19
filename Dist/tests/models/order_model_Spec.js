"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const book_1 = require("../../models/book");
const bstore = new book_1.bookStore();
const store = new order_1.orderStore();
const ustore = new user_1.userStore();
let book_id;
let user_id;
let order_id;
const book = {
    id: 0,
    name: "test_book1",
    price: 12,
    category: 0,
};
const user = {
    id: 0,
    username: "test_order",
    first_name: "tester_first",
    last_name: "tester_last",
    password: "123"
};
describe("order model ", () => {
    beforeAll(async () => {
        const book1 = await bstore.create(book);
        book_id = book1.id;
        const user1 = await ustore.create(user);
        user_id = user1.id;
    });
    afterAll(async () => {
        await store.delete(order_id);
        await bstore.delete(book_id);
        await ustore.delete(user_id);
    });
    it("should have a create methode", async () => {
        expect(store.create).toBeDefined();
    });
    it('create should create a order ', async () => {
        const order = {
            id: 0,
            book_id: book_id,
            quantity: 1,
            user_id: user_id,
            status: 0
        };
        const result = await store.create(order);
        const stat = result.status.toString();
        expect(result.book_id).toEqual(book_id);
        expect(stat).toEqual("Active");
        order_id = result.id;
    });
    it("should have a orderByUser methode", () => {
        expect(store.orderByUser).toBeDefined();
    });
    it('orderByUser should return all user orders ', async () => {
        const result = await store.orderByUser(user_id);
        expect(result).toBeDefined();
        expect(result[0].book_id).toBe(book_id);
    });
});
