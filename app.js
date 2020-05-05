const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Welcome to the real world!');
});

const PORT = 3000;
app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}!`);
});