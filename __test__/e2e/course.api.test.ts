import { app } from '../../src/app';
import { HTTP_STATUS } from '../../src/utils'
import { CreateCourseModel } from '../../src/features/courses/models/CreateCourseModel';
import { UpdateCourseModel } from './../../src/features/courses/models/UpdataCourseModel';
import request from 'supertest'

const getRequest = () => {
	return request(app)
}

describe('/course', () => {

	beforeAll(async() => {
		await getRequest().delete('/__test__/data')
	})

	it('should return 200 and ampy array', async() => {
		await getRequest().get('/courses').expect(HTTP_STATUS.OK_200, []) 
	})

	it('shold return 404 for not existing course', async() => {
		await getRequest().get('/courses/1').expect(HTTP_STATUS.NOT_FOUND_404) 
	})

	it(`should'nt create with incorrect input data`, async() => {
		const data: CreateCourseModel = {title: ''}
		
		await getRequest().post('/courses').send(data)
		.expect(HTTP_STATUS.NOT_FOUND_404)

		await getRequest().get('/courses').expect(200, [])
	})

	let createdCourse1: any =  null
	it(`should create with correct input data`, async() => {
		const data: CreateCourseModel = {title: 'new course'}
		const createResponse = await getRequest()
		.post('/courses')
		.send(data)
		.expect(HTTP_STATUS.CREATED_201)

		createdCourse1 = createResponse.body

		expect(createdCourse1).toEqual({
			id: expect.any(Number),
			title: 'new course'
		})

		await getRequest().get('/courses').expect(HTTP_STATUS.OK_200, [createdCourse1])
	})

	let createdCourse2: any = null 
	it(`create one more course`, async() => {
		const data: CreateCourseModel = {title: 'new course2'}
		const createResponse = await getRequest()
		.post('/courses')
		.send(data)
		.expect(HTTP_STATUS.CREATED_201)

		createdCourse2 = createResponse.body

		expect(createdCourse2)
		.toEqual({
			id: expect.any(Number),
			title: data.title
		})

		await getRequest()
		.get('/courses')
		.expect(HTTP_STATUS.OK_200, [createdCourse1, createdCourse2])
	})

	it(`should'nt updata course with incorrect input data`, async() => {
		const data: UpdateCourseModel = {title: ''}
		await getRequest()
		.put('/courses/' + createdCourse1.id)
		.send(data)
		.expect(HTTP_STATUS.BAD_REQUEST_400)

		await getRequest().get('/courses/' + createdCourse1.id)
		.expect(HTTP_STATUS.OK_200, createdCourse1)
	})

	it(`should'nt updata course that not exists`, async() => {
		const data: UpdateCourseModel = {title: 'good title'}
		await getRequest()
		.put('/courses/' + -100)
		.send(data)
		.expect(HTTP_STATUS.NOT_FOUND_404)
	})

	it(`should update course with correct input data`, async() => {
		const data: UpdateCourseModel = {title: 'good new title'}
		await getRequest()
		.put('/courses/' + createdCourse1.id)
		.send(data)
		.expect(HTTP_STATUS.NO_CONTANT_204)

		await getRequest()
		.get('/courses/' + createdCourse1.id)
		.expect(HTTP_STATUS.OK_200, {
			...createdCourse1,
			title: data.title 
		})
	})

	it(`should delete bouth courses`, async() => {
		await getRequest()
		.delete('/courses/' + createdCourse1.id)
		.expect(HTTP_STATUS.NO_CONTANT_204)

		await getRequest()
		.get('/courses/' + createdCourse1.id)
		.expect(HTTP_STATUS.NOT_FOUND_404)

		await getRequest()
		.delete('/courses/' + createdCourse2.id)
		.expect(HTTP_STATUS.NO_CONTANT_204)

		await getRequest()
		.get('/courses/' + createdCourse2.id)
		.expect(HTTP_STATUS.NOT_FOUND_404)

		await getRequest()
		.get('/courses')
		.expect(HTTP_STATUS.OK_200, [])
	})

	afterAll(function(done) {
		// server.close()
		done()
	})
})