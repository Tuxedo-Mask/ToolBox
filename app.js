'use strict';

const express = require('express');
const constants = require('./src/constants');
if (!process.env.NODE_ENV || process.env.NODE_ENV === constants.environments.dev) {
  // eslint-disable-next-line global-require
  require('dotenv').config('ToolBox');
}

const logger = require('./src/logger')();

const config = require('./src/config');
logger.info(`Running in "${config.nodeEnv}" environment`);

const {uncaughtErrorHandler} = require('./src/utils');

// HH::TODO are this Handlers on correct lines? VZ::Please take a look
// Checking Uncaught Exceptions and Unhandled Rejections
process.on('uncaughtException', (err) => uncaughtErrorHandler('uncaughtException', err));
process.on('unhandledRejection', (err) => uncaughtErrorHandler('unhandledRejection', err));

const app = require('express')();
const router = require('./src/router');
app.use(express.json());
app.use(router);

app.listen(config.port, function() {
  logger.info(`Server is listening on port ${config.port}!`);
});
