import request from 'supertest'
import { app } from '../../src'

describe('/courses', function() {
    beforeAll( async function() {
        await request(app).delete('/__test__/data')
    })
    it('should return 200 and ampty array', async function() {
        await request(app)
            .get('/courses')
            .expect(200, [])
    })
    it('should return 404 for not existiong courses', async function() {
        await request(app)
            .get('/courses/1')
            .expect(404)
    })
    it(`should'nt created course with incourect input data`, async function() {
        await request(app)
            .post('/courses')
            .send({title: 'newCourses'})
            .expect(400)
    })
})