import express, {Request, Response} from 'express'
const app = express()

const port = 4000

const products = [
    {title: 'tomato'},
    {title: 'potato'},
    {title: 'orange'}
]

app.get('/', function(req: Request, res: Response) {
    res.send('<h1>I am the samuray of back-end developer</h1>')
})

app.get('/products', function(req: Request, res: Response) {
    res.json(products)
})

app.get('/products/:productTitle', function(req: Request, res: Response) {
    const product = products.find(p => p.title === req.params.productTitle)
    // res.json(product)
    if(product) {
        res.json(product)
    } else {
        res.status(404).json('404 Not found')
    }
})

app.listen(port, '127.0.0.1', function() {
    console.log(`Server was started at port http://loclahost:${port}`)
})