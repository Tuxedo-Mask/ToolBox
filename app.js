"use strict";

const constants = require("./src/constants");
const logger = require("./src/logger")();

if (!process.env.NODE_ENV || process.env.NODE_ENV === constants.environments.dev) {
  // eslint-disable-next-line global-require
  require("dotenv").config();
}

const config = require("./src/config");
logger.info(`Running in "${config.nodeEnv}" environment`);

// HH::TODO move dbManager testing part to unit testing
const dbManager = require("./src/dbManager")();
dbManager.Test();

const attachMiddlewares = require("./src/middlewares");
const { uncaughtErrorHandler } = require("./src/utils");

// HH::TODO are this Handlers on correct lines? VZ::Please take a look
// Checking Uncaught Exceptions and Unhandled Rejections
process.on("uncaughtException", err => uncaughtErrorHandler("uncaughtException", err));
process.on("unhandledRejection", err => uncaughtErrorHandler("unhandledRejection", err));

const app = require("express")();
// Attach express middlewares
attachMiddlewares(app);

app.listen(config.port, function () {
  logger.info(`Server is listening on port ${config.port}!`);
});
