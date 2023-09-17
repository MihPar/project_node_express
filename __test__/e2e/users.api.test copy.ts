import { UpdateUserModel } from './../../src/features/users/models/UpdataUserModel';
import { app } from '../../src/app';
import { HTTP_STATUS } from '../../src/utils'
import request from 'supertest'
import { RouterPath } from '../../src/app';
import { CreateUserModel } from '../../src/features/users/models/CreateUserModel';

const getRequest = () => {
	return request(app)
}

describe('tests for /users', () => {

	beforeAll(async() => {
		await getRequest().delete('/__test__/data')
	})

	it('should return 200 and ampy array', async() => {
		await getRequest().get(RouterPath.users).expect(HTTP_STATUS.OK_200, []) 
	})

	it('shold return 404 for not existing entity', async() => {
		await getRequest().get(`${RouterPath.users}/1`).expect(HTTP_STATUS.NOT_FOUND_404) 
	})

	it(`shouldn't create course with incorrect input data`, async() => {
		const data: CreateUserModel = {userName: ''}
		
		await getRequest().post(RouterPath.users).send(data)
		.expect(HTTP_STATUS.NOT_FOUND_404)

		await getRequest().get(RouterPath.users).expect(200, [])
	})

	let createdEntity1: any =  null
	it(`should create entity with correct input data`, async() => {
		const data: CreateUserModel = {userName : 'Mickhael'}
		const createResponse = await getRequest()
		.post(RouterPath.users)
		.send(data)
		.expect(HTTP_STATUS.CREATED_201)

		createdEntity1 = createResponse.body

		expect(createdEntity1).toEqual({
			id: expect.any(Number),
			userName: data.userName
		})

		await getRequest().get(RouterPath.users).expect(HTTP_STATUS.OK_200, [createdEntity1])
	})

	let createdEntity2: any = null 
	it(`create one more entity`, async() => {
		const data: CreateUserModel = {userName: 'Tatiana'}
		const createResponse = await getRequest()
		.post(RouterPath.users)
		.send(data)
		.expect(HTTP_STATUS.CREATED_201)

		createdEntity2 = createResponse.body

		expect(createdEntity2)
		.toEqual({
			id: expect.any(Number),
			userName: data.userName
		})

		await getRequest()
		.get(RouterPath.users)
		.expect(HTTP_STATUS.OK_200, [createdEntity1, createdEntity2])
	})

	it(`should'nt updata entity with incorrect input data`, async() => {
		const data: UpdateUserModel = {userName: ''}
		await getRequest()
		.put(`${RouterPath.users}/${createdEntity1.id}`)
		.send(data)
		.expect(HTTP_STATUS.BAD_REQUEST_400)

		await getRequest().get(`${RouterPath.users}/${createdEntity1.id}`)
		.expect(HTTP_STATUS.OK_200, createdEntity1)
	})

	it(`should'nt updata entity that not exists`, async() => {
		const data: UpdateUserModel = {userName: 'DIMICH'}
		await getRequest()
		.put(`${RouterPath.users}/${-100}`)
		.send(data)
		.expect(HTTP_STATUS.NOT_FOUND_404)
	})

	it(`should update entity with correct input data`, async() => {
		const data: UpdateUserModel = {userName: 'ILIA'}
		await getRequest()
		.put(`${RouterPath.users}/${createdEntity1.id}`)
		.send(data)
		.expect(HTTP_STATUS.NO_CONTANT_204)

		await getRequest()
		.get(`${RouterPath.users}/${createdEntity1.id}`)
		.expect(HTTP_STATUS.OK_200, {
			...createdEntity1,
			userName: data.userName 
		})
		await request(app)
			.get(`${RouterPath.users}/${createdEntity2.id}`)
			.expect(HTTP_STATUS.OK_200, createdEntity2)
	})

	it(`should delete bouth courses`, async() => {
		await getRequest()
		.delete(`${RouterPath.users}/${createdEntity1.id}`)
		.expect(HTTP_STATUS.NO_CONTANT_204)

		await getRequest()
		.get(`${RouterPath.users}/${createdEntity1.id}`)
		.expect(HTTP_STATUS.NOT_FOUND_404)

		await getRequest()
		.delete(`${RouterPath.users}/${createdEntity2.id}`)
		.expect(HTTP_STATUS.NO_CONTANT_204)

		await getRequest()
		.get(`${RouterPath.users}/${createdEntity2.id}`)
		.expect(HTTP_STATUS.NOT_FOUND_404)

		await getRequest()
		.get(RouterPath.users)
		.expect(HTTP_STATUS.OK_200, [])
	})

	afterAll(function(done) {
		// server.close()
		done()
	})
})