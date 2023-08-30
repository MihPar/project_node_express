import express, {Request, Response} from 'express'
import bodyParses from 'body-parser'
import { title } from 'process'
import { RequestWithBody, RequestWithQuery, RequestWithParams, RequestWithParamsAndBody } from './types'
import { CourseCreateModel } from './models/courseCreateModel'
import { CourseUpdataModel } from './models/CourseUpdataModule';
export const app = express()

const port = 4000

// const middleware = express.json()
// app.use(middleware)

const parserBody = bodyParses()
app.use(parserBody)

const products = [
    {id: 1, title: 'tomato'},
    {id: 2, title: 'potato'},
    {id: 3, title: 'orange'}
]

const addresses = [
    {id: 1, value: 'Novay 12'},
    {id: 2, value: 'Staray 13'}
]

type CourseType = {
    id: number,
    title: string,
}

let db: {courses: CourseType[]} = {
    courses: [
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'SQL'},
        {id: 4, title: 'PYTHON'}
    ]
}

app.delete('__test__/data', function(req, res) {
    return db.courses = []
    res.sendStatus(204)
})

app.get('/courses', (req: RequestWithQuery<{title: string}>,
                     res: Response<CourseType[]>) => {
    
    let foundCourses = db.courses

    if(req.query.title) {
        foundCourses = foundCourses.filter(function(c) {
            return c.title.indexOf(req.query.title) > -1
        })
    }

    res.json(foundCourses)
})

app.get('/courses/:id', (req: RequestWithParams<{id: string}>, res) => {
    const foundCourses = db.courses.find(function(c) {
        return c.id === Number(req.params.id)
    })
    if(!foundCourses) {
        res.sendStatus(404)
        return 
    }
    res.json(foundCourses)
})

app.post('/courses', (req: RequestWithBody<CourseCreateModel>, res: Response<CourseType>) => {
    if(!req.body.title) {
        res.sendStatus(404)
        return
    }
    const createCourses = {
        id: Number(new Date()),
        title: req.body.title
    }
    db.courses.push(createCourses)
    res.status(201).json(createCourses)
})

app.delete('/courses/:id', function(req: RequestWithParams<{id: string}>, res) {
    db.courses = db.courses.filter(function(c) {
        return c.id !== +req.params.id
    })
    res.sendStatus(204)
})

app.put('/courses/:id', function(req: RequestWithParamsAndBody<{id: string}, CourseUpdataModel>, res) {
    if(!req.body.title) {
        res.sendStatus(404)
        return 
    }
    const foundCourses = db.courses.find(function(c) {
        return c.id === Number(req.params.id)
    })
    if(!foundCourses) {
        res.sendStatus(404)
        return 
    }
    foundCourses.title = req.body.title
    res.sendStatus(204)
})


app.get('/', function(req: Request, res: Response) {
    res.send('<h1>I am the samuray of back-end developer</h1>')
})

app.get('/products', function(req: Request, res: Response) {
    if(req.query.title) {
        let result = req.query.title.toString()
        res.json(products.find(function(p) {
            return p.title.indexOf(result) > -1    
        }))
    } else {
        res.json(products)
    }
})


app.delete('/products/:id', function(req: Request, res: Response) {
    for(let i = 0; i < products.length; i++) {
        if(products[i].id === Number(req.params.id)) {
            products.splice(i, 1)
            res.json(204)
            return
        } 
    }
    res.json(404)
})

app.get('/products/:productTitle', function(req: Request, res: Response) {
    const product = products.find(p => p.title === req.params.productTitle)
    if(product) {
        res.json(product)
    } else {
        res.status(404).json('404 Not found')
    }
})

app.get('/addresses/:id', function(req: Request, res: Response) {
    let result
    for(let item of addresses) {
        if(item.id === Number(req.params.id)) {
            result = item.value
        }
    }
    res.json(result)
    // let result = addresses.find(function(address) {
    //     return address.id === Number(req.params.id)
    // })
    // if(result) {
    //     res.json(result)
    // } else {
    //     res.status(404).json('Not found')
    // }
})

app.post('/products', function(req: Request, res: Response) {
    const newProduct = {
        id: Number(new Date()),
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
})

app.put('/products/:id', function(req: Request, res: Response) {
    let product = products.find(function(p) {
        return p.id === Number(req.params.id)
    })
    if(product) {
        product.title = req.body.title
        res.status(201).json(product)
    } else {
    res.json(404)}
})

app.listen(port, '127.0.0.1', function() {
    console.log(`Server was started at port http://loclahost:${port}`)
})