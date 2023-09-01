import express from 'express'
export const app = express()
const port = 4000

const middleware = express.json()
app.use(middleware)

export const HTTP_STATUS = {
	OK_200: 200,
	CREATED_201: 201,
	NO_CONTANT_204: 204,

	BAD_REQUEST_400: 400,
	NOT_FOUND_404: 404,
}

const db = {
    courses: [
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'SQL'},
        {id: 4, title: 'PYTHON'}
    ]
}

app.get('/courses', (req, res) => {
    
    let foundCourses = db.courses

    if(req.query.title) {
        foundCourses = foundCourses.filter(function(c) {
            return c.title.indexOf(req.query.title as string) > -1
        })
    }

    res.json(foundCourses)
})

app.get('/courses/:id', (req, res) => {
    const foundCourses = db.courses.find(function(c) {
        return c.id === Number(req.params.id)
    })
    if(!foundCourses) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        return 
    }
    res.json(foundCourses)
})

app.post('/courses', (req, res) => {
    if(!req.body.title) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        return
    }
    const createCourses = {
        id: Number(new Date()),
        title: req.body.title
    }
    db.courses.push(createCourses)
    res.status(201).json(createCourses)
})

app.delete('/courses/:id', function(req, res) {
    db.courses = db.courses.filter(function(c) {
        return c.id !== +req.params.id
    })
    res.sendStatus(204)
})

app.put('/courses/:id', function(req, res) {
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

app.delete('/__test__/data', (req, res) => {
	db.courses = []
	res.sendStatus(HTTP_STATUS.NO_CONTANT_204)
})

// app.listen(port, function() {
//     console.log(`Server was started at port http://localhost:${port}`)
// })