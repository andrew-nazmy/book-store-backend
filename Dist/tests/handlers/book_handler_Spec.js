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
    username: "test_end_point",
    first_name: "andrew",
    last_name: "george",
    password: "12345"
};
const test_book = {
    name: "Science Book",
    price: 13,
    category: 1
};
let test_book_id;
describe("book endpoints", () => {
    beforeAll(async () => {
        const response = await request.post("/users/login").send({ username: test_user.username,
            password: test_user.password
        });
        token = response.body;
    });
    it("create book endpoint", async () => {
        const response = await request.post("/books").send(test_book).set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Science Book");
        test_book_id = response.body.id;
    });
    it("index api endpoint", async () => {
        const response = await request.get("/books");
        expect(response.status).toBe(200);
        expect(response.body.some((item) => item.name === "Science Book")).toBeTrue();
    });
    it("show book api endpoint", async () => {
        const response = await request.get("/books/" + test_book_id);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Science Book");
    });
});
