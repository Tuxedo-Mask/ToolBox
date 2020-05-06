const express = require("express");
const config = require("./config");
const app = express();

const mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "testUser",
    password: "Password1",
    database: "testscheme"
});

// HH::TODO Add module to set up db connection, create test schemes and table, fill test data

con.connect(function(err) {
    if (err) {
        throw err;
    }
    con.query("SELECT * FROM testscheme.users", function (err, result, fields) {
        if (err) {
            throw err;
        }
        console.log(result);
    });
});

// HH::TODO check if call to connect blocks event loop;

app.get('/', function (req, res) {
    res.send('Welcome to the real world!');
});

app.listen(config.PORT, function () {
    console.log(`Server is listening on port ${config.PORT}!`);
});