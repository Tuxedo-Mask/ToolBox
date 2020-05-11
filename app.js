"use strict";
const constants = require("./src/constants");
const logger = require("./src/logger")();

if (!process.env.NODE_ENV || process.env.NODE_ENV === constants.environments.dev) {
  // eslint-disable-next-line global-require
  require("dotenv").config();
  // eslint-disable-next-line global-require
  logger.info(`Running in '${require("./src/config").nodeEnv}' environment`);
}
const config = require("./src/config");

const attachMiddlewares = require("./src/middlewares");
const { uncaughtErrorHandler } = require("./src/utils");

// Checking Uncaught Exceptions and Unhandled Rejections
process.on("uncaughtException", err => uncaughtErrorHandler("uncaughtException", err));
process.on("unhandledRejection", err => uncaughtErrorHandler("unhandledRejection", err));

const app = require("express")();
// Attach express middlewares
attachMiddlewares(app);

// const dbManager = require("./src/dbManager")();
// HH::TODO call to dbManager.Test() blocks the event loop, find solution using connection pool 
// dbManager.Test();

app.listen(config.port, function () {
  logger.info(`Server is listening on port ${config.port}!`);
});
