"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = exports.status = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
var status;
(function (status) {
    status[status["Active"] = 0] = "Active";
    status[status["Complete"] = 1] = "Complete";
})(status = exports.status || (exports.status = {}));
class orderStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    async orderByUser(id) {
        try {
            const sql = 'SELECT A.id,A.user_id,A.status,B.quantity,B.book_id FROM orders A INNER JOIN order_books B on A.id = B.order_id WHERE A.user_id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find Order ${id}. Error: ${err}`);
        }
    }
    async create(b) {
        try {
            const sql = 'INSERT INTO orders ( user_id,status) VALUES($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            var Order;
            if (b.status == 0 || b.status == 1) {
                let result = await conn
                    .query(sql, [b.user_id, status[b.status]]);
                const order_id = result.rows[0].id;
                const sql1 = 'INSERT INTO order_books ( order_id , quantity,book_id) VALUES($1, $2,$3) RETURNING *';
                let result2 = await conn
                    .query(sql1, [order_id, b.quantity, b.book_id]);
                Order = result.rows[0];
                Order.book_id = result2.rows[0].book_id;
                Order.quantity = result2.rows[0].quantity;
                Order.id = order_id;
            }
            else {
                throw new Error(`Could not add new Order for user ${b.user_id}. Error: invalid status (0,1) `);
            }
            conn.release();
            return Order;
        }
        catch (err) {
            throw new Error(`Could not add new Order for user ${b.user_id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql1 = 'DELETE FROM order_books WHERE order_id=($1)';
            const sql = 'DELETE FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            await conn.query(sql1, [id]);
            await conn.query(sql, [id]);
            conn.release();
        }
        catch (err) {
            throw new Error(`Could not delete Order ${id}. Error: ${err}`);
        }
    }
}
exports.orderStore = orderStore;
