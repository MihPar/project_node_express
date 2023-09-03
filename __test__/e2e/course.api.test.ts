import request from 'supertest'
import {app} from '../../src/index'
import { HTTP_STATUS } from '../../src/index'

describe('/course', () => {

	beforeAll(async() => {
		await request(app).delete('/__test__/data')
	})

	it('should return 200 and ampy array', async() => {
		await request(app).get('/courses').expect(HTTP_STATUS.OK_200, []) 
	})

	it('shold return 404 for not existing course', async() => {
		await request(app).get('/courses/1').expect(HTTP_STATUS.NOT_FOUND_404) 
	})

	it(`should'nt create with incorrect input data`, async() => {
		await request(app).post('/courses').send({title: ''})
		.expect(HTTP_STATUS.NOT_FOUND_404)

		await request(app).get('/courses').expect(200, [])
	})

	let createdCourse1: any =  null
	it(`should create with correct input data`, async() => {
		const createResponse = await request(app)
		.post('/courses')
		.send({title: 'new course'})
		.expect(HTTP_STATUS.CREATED_201)

		createdCourse1 = createResponse.body

		expect(createdCourse1).toEqual({
			id: expect.any(Number),
			title: 'new course'
		})

		await request(app).get('/courses').expect(HTTP_STATUS.OK_200, [createdCourse1])
	})

	let createdCourse2: any = null 
	it(`create one more course`, async() => {
		const createResponse = await request(app)
		.post('/courses')
		.send({title: 'new course2'})
		.expect(HTTP_STATUS.CREATED_201)

		createdCourse2 = createResponse.body

		expect(createdCourse2)
		.toEqual({
			id: expect.any(Number),
			title: 'new course2'
		})

		await request(app)
		.get('/courses')
		.expect(HTTP_STATUS.OK_200, [createdCourse1, createdCourse2])
	})

	it(`should'nt updata course with incorrect input data`, async() => {
		await request(app)
		.put('/courses/' + createdCourse1.id)
		.send({title: ''})
		.expect(HTTP_STATUS.BAD_REQUEST_400)

		await request(app).get('/courses/' + createdCourse1.id)
		.expect(HTTP_STATUS.OK_200, createdCourse1)
	})

	it(`should'nt updata course that not exists`, async() => {
		await request(app)
		.put('/courses/' + -100)
		.send({title: 'good title'})
		.expect(HTTP_STATUS.NOT_FOUND_404)
	})

	it(`should update course with correct input data`, async() => {
		await request(app)
		.put('/courses/' + createdCourse1.id)
		.send({title: 'good new title'})
		.expect(HTTP_STATUS.NO_CONTANT_204)

		await request(app)
		.get('/courses/' + createdCourse1.id)
		.expect(HTTP_STATUS.OK_200, {
			...createdCourse1,
			title: 'good new title' 
		})
	})

	it(`should delete bouth courses`, async() => {
		await request(app)
		.delete('/courses/' + createdCourse1.id)
		.expect(HTTP_STATUS.NO_CONTANT_204)

		await request(app)
		.get('/courses/' + createdCourse1.id)
		.expect(HTTP_STATUS.NOT_FOUND_404)

		await request(app)
		.delete('/courses/' + createdCourse2.id)
		.expect(HTTP_STATUS.NO_CONTANT_204)

		await request(app)
		.get('/courses/' + createdCourse2.id)
		.expect(HTTP_STATUS.NOT_FOUND_404)

		await request(app)
		.get('/courses')
		.expect(HTTP_STATUS.OK_200, [])
	})
})