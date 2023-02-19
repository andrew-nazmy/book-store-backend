CREATE TABLE users (id SERIAL UNIQUE, username VARCHAR(20) UNIQUE, first_name VARCHAR(20), last_name VARCHAR(20), password VARCHAR(200),PRIMARY KEY(id,username));

CREATE TABLE books (id SERIAL PRIMARY KEY, name VARCHAR(30), price INTEGER, category VARCHAR(20));

CREATE TABLE orders (id SERIAL, user_id INTEGER REFERENCES users(id),status varchar(10),PRIMARY KEY(id));

CREATE TABLE order_books (id SERIAL, order_id INTEGER REFERENCES orders(id), quantity INTEGER, book_id INTEGER REFERENCES books(id),PRIMARY KEY(id));


