import express from 'express'
const app = express()

const port = process.env.PORT || 4000

app.get('/', function(req, res) {
    res.send('<h1>I am the samuray of back-end developer</h1>')
})
app.listen(port, '127.0.0.1', function() {
    console.log(`Server was started at port http://loclahost:${port}`)
})