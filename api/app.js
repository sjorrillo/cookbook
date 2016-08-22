import express from 'express';
import bodyParser from 'body-parser';
import {routes as configureRoutes} from './routes';
import knex from 'knex';

const app = express();
const port = process.env.PORT || 3032; 

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// database
const db = knex({
    client: 'pg',
    connection: {
        user: 'postgres',
        database: 'cookbook',
        port: 1433,
        host: 'localhost',
        password: 'Houston'
    },
    searchPath: 'knex,public'
});

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
configureRoutes(app, router, db);
app.use('/api', router);

// Start the server
app.listen(port); 