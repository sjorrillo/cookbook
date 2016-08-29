import express from 'express';
import bodyParser from 'body-parser';
import {routes as configureRoutes} from './routes';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3032; 

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
configureRoutes(router, {});
app.use('/api', cors(), router);

// Start the server
app.listen(port); 