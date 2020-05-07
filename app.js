const express = require("express");
const config = require("./config");
const app = express();
const dbManager = require("./ToolBoxDB/dbManager")();

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
con =  mysql.createConnection({
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
    dbManager.SelecAll(con);
});

// HH::TODO check if call to connect blocks event loop;
app.get('/', function (req, res) {
    res.send('Welcome to the real world!');
});

app.listen(config.PORT, function () {
    console.log(`Server is listening on port ${config.PORT}!`);
});