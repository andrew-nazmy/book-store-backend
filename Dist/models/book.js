"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookStore = exports.category = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
var category;
(function (category) {
    category[category["Comedy"] = 0] = "Comedy";
    category[category["Science"] = 1] = "Science";
    category[category["Story"] = 2] = "Story";
    category[category["Bio"] = 3] = "Bio";
})(category = exports.category || (exports.category = {}));
class bookStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM books';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get books. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM books WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find Book ${id}. Error: ${err}`);
        }
    }
    async showByCategory(categoryNum) {
        try {
            const sql = 'SELECT * FROM books WHERE category=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [category[categoryNum]]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find Book ${category}. Error: ${err}`);
        }
    }
    async create(b) {
        try {
            const sql = 'INSERT INTO books ( name, price, category) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            var Book;
            if (b.category == 0 || b.category == 1 || b.category == 2 || b.category == 3) {
                const result = await conn
                    .query(sql, [b.name, b.price, category[b.category]]);
                Book = result.rows[0];
            }
            else {
                throw new Error(`Could not add new Book ${b.name}. Error: invalid category (0,1,2,3) `);
            }
            conn.release();
            return Book;
        }
        catch (err) {
            throw new Error(`Could not add new Book ${b.name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM books WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            await conn.query(sql, [id]);
            conn.release();
        }
        catch (err) {
            throw new Error(`Could not delete Book ${id}. Error: ${err}`);
        }
    }
}
exports.bookStore = bookStore;
