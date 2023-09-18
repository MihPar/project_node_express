import { app } from "../../src/app";
import { HTTP_STATUS } from "../../src/utils";
import request from "supertest";
import { RouterPath } from "../../src/app";
import { userTestManager } from "../utils/userTestManager";
import { usersCoursesTestManager } from "../utils/usersCoursesTestManager";

const getRequest = () => {
  return request(app);
};

describe("tests for /users_courses_bindings", () => {
  beforeAll(async () => {
    await getRequest().delete(`${RouterPath.__test__}/data`);
  });


  it(`should create entity with incorrect input data`, async () => {
    const data: CreateUserCourseBindingModel = { userId: 10, courseId: 10 };

	await usersCoursesTestManager.createBinding(data, HTTP_STATUS.NOT_FOUND_404)
    await getRequest().get(RouterPath.users).expect(200, []);
  });

  

  afterAll(function (done) {
    // server.close()
    done();
  });
});
