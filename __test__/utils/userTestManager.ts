import { HTTP_STATUS, HttpStatusType } from './../../src/utils';
import { app, RouterPath } from '../../src/app';
import { CreateUserModel } from '../../src/features/users/models/CreateUserModel';
import request from 'supertest'

const getRequest = () => {
	return request(app)
}

export const userTestManager = {
	async createUser(data: CreateUserModel, expectedStatuesCode: HttpStatusType = HTTP_STATUS.CREATED_201) {
		 const response = await getRequest()
       .post(RouterPath.users)
       .send(data)
       .expect(HTTP_STATUS.CREATED_201);

	   let createdEntity;
     if (expectedStatuesCode === HTTP_STATUS.OK_200) {
       createdEntity = response.body;
       expect(createdEntity).toEqual({
         id: expect.any(Number),
         userName: data.userName,
       });
     }

		
	return {response, createdEntity}
	}
}
