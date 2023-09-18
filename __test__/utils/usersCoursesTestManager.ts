import { CreateCourseModel } from '../../src/features/courses/models/CreateCourseModel';
import { HTTP_STATUS, HttpStatusType } from '../../src/utils';
import { app, RouterPath } from '../../src/app';
import request from 'supertest'

const getRequest = () => {
	return request(app)
}

export const usersCoursesTestManager = {
	async createBinding(data: CreateUserCourseBindingModel, expectedStatuesCode: HttpStatusType = HTTP_STATUS.CREATED_201) {
		 const response = await getRequest()
       .post(RouterPath.courses)
       .send(data)
       .expect(HTTP_STATUS.CREATED_201);

	   let createdEntity;
     if (expectedStatuesCode === HTTP_STATUS.OK_200) {
       createdEntity = response.body;
       expect(createdEntity).toEqual({
		id: expect.any(Number),
		title: data.title
	})
     }

		
	return {response: response, createdEntity: createdEntity}
	}
}
