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


const express = require("express");
const config = require("./config");
const app = express();
const dbManager = require("./src/dbManager")();

const mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "testUser",
  password: "Password1"
});

con.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("Connected to mysql DB!");

  dbManager.CreateTestScheme(con)
});
con.end();

// HH::TODO find more elegant solution
con = mysql.createConnection({
  host: "localhost",
  user: "testUser",
  password: "Password1",
  database: "testDB"
});
con.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("Connected to mysql DB!");

  dbManager.CreateTestTable(con);
  dbManager.DeleteAllData(con);
  dbManager.CreateTestData(con);
  dbManager.SelectAll(con);
});

// HH::TODO check if call to connect blocks event loop;
app.get('/', function (req, res) {
  res.send('Welcome to the real world!');
});

app.listen(config.PORT, function () {
  console.log(`Server is listening on port ${config.PORT}!`);
});
