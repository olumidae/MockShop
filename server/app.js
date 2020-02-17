import express from 'express';
import bodyParser from 'body-parser';
import debug from 'debug';

/**
 * @fileoverview - Application entry point
 * @requires - express
 * @requires - body-parser
 * @requires - dotenv
 * @requires - debug
 * @requires - cors
 * @requires - ./routes
 * @exports - app.js
*/

const app = express();

// declare bodyParser as middleware which handles post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 3rd party middleware
// Logs message to display HTTP requests in test environment
if (app.get('env') === 'development') {
  debug('app:startup')('Morgan enabled...');
}


app.get('/', (req, res) => {
  res.send({
    message: 'Hello, Welcome to Mock Shop API',
  });
});

debug('app:startup')('The app environment is: ', app.get('env'));
export default app;
