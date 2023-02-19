"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let id;
const store = new user_1.userStore();
describe("user model ", () => {
    it("should have an index methode", () => {
        expect(store.index).toBeDefined();
    });
    it('index should return all users ', async () => {
        const result = await store.index();
        expect(result).toBeDefined();
    });
    it("should have a create methode", () => {
        expect(store.create).toBeDefined();
    });
    it('create should create a user ', async () => {
        const user = {
            id: 0,
            username: "test",
            first_name: "tester_first",
            last_name: "tester_last",
            password: "123"
        };
        const result = await store.create(user);
        expect(result.username).toEqual("test");
        expect(result.password).not.toEqual("123");
        id = result.id;
    });
    it("should have a show methode", () => {
        expect(store.show).toBeDefined();
    });
    it('show should return a user ', async () => {
        const result = await store.show(id);
        expect(result.username).toEqual("test");
    });
    it("should have a login methode", () => {
        expect(store.login).toBeDefined();
    });
    it('login should return a user token ', async () => {
        const result = await store.login("test", "123");
        expect(result).toBeDefined;
    });
    it("should have a delete methode", () => {
        expect(store.delete).toBeDefined();
    });
    it('delete should remove a user  ', async () => {
        await store.delete(id);
        const result = await store.show(id);
        expect(result).toBeUndefined();
    });
});
