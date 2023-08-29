import request from 'supertest'
import {app} from './index'

describe('/course', () => {
    beforeAll(async function() {
        await request(app).delete('__test__/data')
    })

    it('should return 200 and ampty array', async () => {
       await request(app)
        .get('/courses')
        .expect(200, [])
    })

    it('should return 404 for not existing courses',
        async () => {
            await request(app)
            .get('/courses/1')
            .expect(404, [])
        })
    it(`should'nt create course with correct input data`, 
        async () => {
            await request(app)
            .post('/courses')
            .send({title: ''})
            .expect(400)
        }
    )
})