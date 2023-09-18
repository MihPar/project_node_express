import { HTTP_STATUS, HttpStatusType } from '../../src/utils';
import { app, RouterPath } from '../../src/app';
import request from 'supertest'
import { CreateUseCourseBindingrModel } from '../../src/features/users_courses_bindings/models/CreateCourseUserBoindingModel';


const getRequest = () => {
	return request(app)
}

export const usersCoursesBindingsTestManager = {
	async createBinding(data: CreateUseCourseBindingrModel, expectedStatuesCode: HttpStatusType = HTTP_STATUS.CREATED_201) {
		 const response = await getRequest()
       .post(RouterPath.usersCoursesBindings)
       .send(data)
       .expect(HTTP_STATUS.CREATED_201);

	   let createdEntity;
     if (expectedStatuesCode === HTTP_STATUS.OK_200) {
       createdEntity = response.body;
       expect(createdEntity).toEqual({
		userId: data.userId,
		courseId: data.courseId,
		userName: expect.any(String),
		courseTitle: expect.any(String),
	})
     }

		
	return {response: response, createdEntity: createdEntity}
	}
}
