Storefront backend
This repo contains the backend application for an eCommerce store front. It is a RESTful API.

The database schema and and API route information can be found in the requirements doc.

Libraries used
The application uses the following libraries:

Runtime: Node.js (JavaScript)
Web application framework: Express
Language: TypeScript
Database: Postgres
Testing: Jasmine and Supertest
Installation Instructions
Dev mode:
To install the app's dependencies and use the app in dev mode, run the following:

npm init 

create 2 database in psql (book_store , book_store_test) and run both commands (npm run migrateup)

To run the app in dev mode execute npm start.

compile project : run (npm run tsc)

Test:
To  run the test, run the following:

(npm run test_env, npm run jasmine)
This script assumes you have installed postgres on your local system and the server is running.


Ports
The application runs on port 3000 with database on 5432.

Environment variables
To satisfy Udacity requirements, the following environment variable are needed.

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=book_store
POSTGRES_TEST_DB=book_store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=12345
BCRYPT_PASSWORD=nazmy_num_1
SALT_ROUNDS=10
TOKEN_SECRET=nazmy
ENV=dev
