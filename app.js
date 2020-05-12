"use strict";
const constants = require("./src/constants");

if (!process.env.NODE_ENV || process.env.NODE_ENV === constants.environments.dev) {
  // eslint-disable-next-line global-require
  require("dotenv").config();
}

const config = require("./src/config");
const logger = require("./src/logger")();
logger.info(`Running in '${config.nodeEnv}' environment`);
// VZ::TODO delete
logger.info(`logLevel: ${config.logLevel}`);

const attachMiddlewares = require("./src/middlewares");
const { uncaughtErrorHandler } = require("./src/utils");
const app = require("express")();
// Attach express middlewares
attachMiddlewares(app);

// const dbManager = require("./src/dbManager")();
// HH::TODO call to dbManager.Test() blocks the event loop, find solution using connection pool 
// dbManager.Test();
app.listen(config.port, function () {
  logger.info(`Server is listening on port ${config.port}!`);
});

// Checking Uncaught Exceptions and Unhandled Rejections
process.on("uncaughtException", err => uncaughtErrorHandler("uncaughtException", err));
process.on("unhandledRejection", err => uncaughtErrorHandler("unhandledRejection", err));
