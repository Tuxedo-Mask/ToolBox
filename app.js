"use strict";

require('dotenv').config();

// if (!process.env.NODE_ENV || process.env.NODE_ENV === environments.dev) {
//   // eslint-disable-next-line global-require
//   require('dotenv').config();
// }


const config = require('./src/config');
const attachMiddlewares = require('./src/middlewares');
const { uncaughtErrorHandler } = require('./src/utils');


console.log(`Running in '${config.nodeEnv}' environment`);

// Checking Uncaught Exceptions and Unhandled Rejections
process.on('uncaughtException', err => uncaughtErrorHandler('uncaughtException', err));
process.on('unhandledRejection', err => uncaughtErrorHandler('unhandledRejection', err));

const app = require('express')();
// Attach express middlewares
attachMiddlewares(app);

const dbManager = require("./src/dbManager")();
// HH::TODO call to dbManager.Test() blocks the event loop, find solution using connection pool 
dbManager.Test();

/*app.get('/', function (req, res) {
  res.send('Welcome to the real world!');
});

app.listen(config.PORT, function () {
  console.log(`Server is listening on port ${config.PORT}!`);
});
*/