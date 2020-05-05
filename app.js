const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Welcome to the real world!');
});

const PORT = 3000;
const MYSQL_PORT = 3306;
const X_PROTOCOL_PORT = 33060;
app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}!`);
});