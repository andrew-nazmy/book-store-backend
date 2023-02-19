endpoints
user model 
index GET/ http://localhost:3000/users get all users   (require token)
show GET/  http://localhost:3000/users/:id replace :id with the user id you want to show (require token)
create POST/ http://localhost:3000/create to create a user 
you must send a JSON object in the body 
{
    username:string
    first_name:string
    last_name:string
    password:string
}

login POST/ http://localhost:3000/users/login to login and receive a token 
you must send a JSON object in the body 
{
    username:string
    password:string
}
book model 
index GET/ http://localhost:3000/books get all books 
show GET/  http://localhost:3000/books/:id replace :id with the book id you want to show
create POST/ http://localhost:3000/books to create a book (require token)
you must send a JSON object in the body 
{
    "name": string
    "price":number 
    "category":number (0 for comedy,1 for science,2 for story,3 for bio) 
}
remove DELETE/ http://localhost:3000/books (require token)
you must send a JSON object in the body 
{
    id : number represent the book id 
}
order model 
index GET/ http://localhost:3000/orders get all orders (require token)
orderByUser GET/ http://localhost:3000/orders/:id replace :id with user id to get all his orders (require token)
create POST/ http://localhost:3000/orders t create order (require token)
you must send a JSON object in the body 
  {  "book_id":number the book id
    "quantity": number
    "user_id":number the user id,
    "status":number (0 for ACTIVE,1 for Complete)
    }
remove DELETE/ http://localhost:3000/orders (require token)
you must send a JSON object in the body 
{
    id : number represent the order id 
}    

(require token) you have to insert the toin provided from user login API in  Authorization in the header of the request in the form (Bearer (TOKEN)) 

database schema 

user table
columns
id integer
username VARCHAR(20) UNIQUE 
first_name VARCHAR(20)
last_name VARCHAR(20)
password VARCHAR(200)
PRIMARY KEY
(id,username)

book table
columns
id integer 
name VARCHAR(30)
price INTEGER
category VARCHAR(20)
PRIMARY KEY
(id)

orders table
columns
id integer
user_id INTEGER REFERENCES users(id)
status varchar(10)
PRIMARY KEY
(id)

order_books table
columns
id integer 
order_id INTEGER REFERENCES orders(id)
quantity INTEGER
book_id INTEGER REFERENCES books(id)
PRIMARY KEY
(id)

