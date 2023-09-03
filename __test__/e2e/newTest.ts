import request from 'supertest'
import {app} from '../../src/index'

describe('/course', () => {

	beforeAll(async() => {
		await request(app)
		.delete('/__test__/data')
	})
	it('/should return 200 and ampty array', () => {
		request(app)
		.get('/courses')
		.expect(200, [
			{id: 1, title: 'front-end'},
			{id: 2, title: 'back-end'},
			{id: 3, title: 'SQL'},
			{id: 4, title: 'PYTHON'}
		])
	})

	it('should return 404 for not existing course', async () => {
		await request(app)
		.get('/courses/1')
		expect(404)
	})
})
