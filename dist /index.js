"use strict";
const express = require('express');
const app = express();
const port = 4000;
app.get('/', function (req, res) {
    let message = 'Goodbuy my past life';
    res.send(message);
});
app.listen(port, '127.0.0.1', function () {
    console.log(`Server was started at port http://localhost:${port}`);
});
