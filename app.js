'use strict';

if (!process.env.NODE_ENV || process.env.NODE_ENV === environments.dev) {
    // eslint-disable-next-line global-require
    require('dotenv').config();
}

const app = require('express')();
const config = require('./src/config');
const attachMiddlewares = require('./src/middlewares');
const { uncaughtErrorHandler } = require('./src/utils');


console.log(`Running in '${config.nodeEnv}' environment`);
// Attach express middlewares
attachMiddlewares(app);
// Binding port
app.listen(config.port, console.log(`Listening on port: ${config.port}`));

// Checking Uncaught Exceptions and Unhandled Rejections
process.on('uncaughtException', err => uncaughtErrorHandler('uncaughtException', err));
process.on('unhandledRejection', err => uncaughtErrorHandler('unhandledRejection', err));
