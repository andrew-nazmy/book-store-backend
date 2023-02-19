"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("../middleware/auth");
dotenv_1.default.config();
const store = new order_1.orderStore();
const index = async (req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderByUser = async (req, res) => {
    try {
        const order = await store.orderByUser(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(404);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const order = {
            id: 0,
            book_id: req.body.book_id,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
            status: req.body.status
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
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
const order_routes = (app) => {
    app.get('/orders', auth_1.auth, index);
    app.get('/orders/:id', auth_1.auth, orderByUser);
    app.post('/orders', auth_1.auth, create);
    app.delete('/orders', auth_1.auth, remove);
};
exports.default = order_routes;
