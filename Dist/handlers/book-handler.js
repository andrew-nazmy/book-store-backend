"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../models/book");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("../middleware/auth");
dotenv_1.default.config();
const store = new book_1.bookStore();
const index = async (req, res) => {
    try {
        const books = await store.index();
        res.json(books);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const book = await store.show(req.params.id);
        res.json(book);
    }
    catch (err) {
        res.status(404);
        res.json(err);
    }
};
const showByCategory = async (req, res) => {
    try {
        const book = await store.showByCategory(req.params.num);
        res.json(book);
    }
    catch (err) {
        res.status(404);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const book = {
            id: 0,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newBook = await store.create(book);
        res.json(newBook);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const remove = async (req, res) => {
    try {
        const removed = await store.delete(req.body.id);
        res.json(removed);
    }
    catch (err) {
        res.status(404);
        res.json(err);
    }
};
const book_routes = (app) => {
    app.get('/books', index);
    app.get('/books/:id', show);
    app.get('/books/category/:num', showByCategory);
    app.post('/books', auth_1.auth, create);
    app.delete('/books', auth_1.auth, remove);
};
exports.default = book_routes;
