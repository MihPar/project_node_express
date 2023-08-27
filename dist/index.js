"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 4000;
// const middleware = express.json()
// app.use(middleware)
const parserBody = (0, body_parser_1.default)();
app.use(parserBody);
const products = [
    { id: 1, title: 'tomato' },
    { id: 2, title: 'potato' },
    { id: 3, title: 'orange' }
];
const addresses = [
    { id: 1, value: 'Novay 12' },
    { id: 2, value: 'Staray 13' }
];
app.get('/', function (req, res) {
    res.send('<h1>I am the samuray of back-end developer</h1>');
});
app.get('/products', function (req, res) {
    if (req.query.title) {
        let result = req.query.title.toString();
        res.json(products.find(function (p) {
            return p.title.indexOf(result) > -1;
        }));
    }
    else {
        res.json(products);
    }
});
app.delete('/products/:id', function (req, res) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === Number(req.params.id)) {
            products.splice(i, 1);
            res.json(204);
            return;
        }
    }
    res.json(404);
});
app.get('/products/:productTitle', function (req, res) {
    const product = products.find(p => p.title === req.params.productTitle);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json('404 Not found');
    }
});
app.get('/addresses/:id', function (req, res) {
    let result;
    for (let item of addresses) {
        if (item.id === Number(req.params.id)) {
            result = item.value;
        }
    }
    res.json(result);
    // let result = addresses.find(function(address) {
    //     return address.id === Number(req.params.id)
    // })
    // if(result) {
    //     res.json(result)
    // } else {
    //     res.status(404).json('Not found')
    // }
});
app.post('/products', function (req, res) {
    const newProduct = {
        id: Number(new Date()),
        title: req.body.title
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
app.put('/products/:id', function (req, res) {
    let product = products.find(function (p) {
        return p.id === Number(req.params.id);
    });
    if (product) {
        product.title = req.body.title;
        res.status(201).json(product);
    }
    else {
        res.json(404);
    }
});
app.listen(port, '127.0.0.1', function () {
    console.log(`Server was started at port http://loclahost:${port}`);
});
