"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
let token;
const test_user = {
    username: "test_end_point_order",
    first_name: "andrew",
    last_name: "george",
    password: "12345"
};
let test_user_id;
const test_book = {
    name: "Science Book",
    price: 13,
    category: 1
};
let test_order = {
    book_id: 0,
    quantity: 2,
    user_id: 0,
    status: 0
};
let test_order_id;
describe("order endpoints", () => {
    beforeAll(async () => {
        const response2 = await request.post("/users").send(test_user);
        const response = await request.post("/users/login").send({ username: test_user.username,
            password: test_user.password
        });
        token = response.body;
        const response1 = await request.post("/books").send(test_book).set('Authorization', 'Bearer ' + token);
        test_order.book_id = response1.body.id;
        test_order.user_id = response2.body.id;
        test_user_id = response2.body.id;
    });
    it("create order endpoint", async () => {
        const response = await request.post("/orders").set('Authorization', 'Bearer ' + token).send(test_order);
        expect(response.status).toBe(200);
        expect(response.body.user_id).toBe(test_user_id);
        test_order_id = response.body.id;
    });
    it("get order by user id endpoint", async () => {
        const response = await request.get("/orders/" + test_user_id).set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body[0].user_id).toBe(test_user_id);
    });
});
