import request from 'supertest'
import {app} from '../../src/index'
import { HTTP_STATUS } from '../../src/index'

describe('/course', () => {

	beforeAll(async() => {
		await request(app).delete('/__test__/data')
	})

	it('shold return 200 and ampy array', async() => {
		await request(app).get('/courses').expect(200, []) 
	})

	it('shold return 404 for not existing course', async() => {
		await request(app).get('/courses/9').expect(HTTP_STATUS.NOT_FOUND_404) 
	})

	it(`should'nt create with incorrect input data`, async() => {
		await request(app).post('/courses').send({title: ''}).expect(HTTP_STATUS.BAD_REQUEST_400)
	})
})