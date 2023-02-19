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
let hash_pass;
let test_user_id;
describe("user endpoints", () => {
    beforeAll(async () => {
        const response = await request.post("/users").send(test_user);
        expect(response.status).toBe(200);
        expect(response.body.username).toBe("test_end_point");
        test_user_id = response.body.id;
        hash_pass = response.body.password;
    });
    it("endpoints uses authenticaction fail without token", async () => {
        const response = await request.get("/users");
        expect(response.status).toBe(401);
    });
    it("login user endpoint", async () => {
        const response = await request.post("/users/login").send({ username: test_user.username,
            password: test_user.password
        });
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        token = response.body;
    });
    it("index api endpoint", async () => {
        const response = await request.get("/users").set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body.some((item) => item.username === "test_end_point")).toBeTrue();
    });
    it("show user api endpoint", async () => {
        const response = await request.get("/users/" + test_user_id).set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body.username).toBe("test_end_point");
    });
});
