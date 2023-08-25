"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.get('/', function (req, res) {
    res.send('<h1>I am the samuray of back-end developer</h1>');
});
app.listen(port, '127.0.0.1', function () {
    console.log(`Server was started at port http://loclahost:${port}`);
});
