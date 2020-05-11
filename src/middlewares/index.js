const express = require("express");
const setupRoutes = require("../routes");
const swagger = require("./swagger");

module.exports = (app) => {
  // Recognize the incoming Request Object as a JSON Object.
  app.use(express.json());
  // Running controllers
  app.use("/", setupRoutes());
  app.use("/docs", swagger);
};
