import { CreateUseCourseBindingrModel } from "./../../src/features/users_courses_bindings/models/CreateCourseUserBoindingModel";
import { app } from "../../src/app";
import request from "supertest";
import { RouterPath } from "../../src/app";
import { usersCoursesBindingsTestManager } from "../utils/usersCoursesBindingTestManager";
import { userTestManager } from "../utils/userTestManager";
import { coursesTestManager } from "../utils/courseTestManager";
import { HTTP_STATUS } from "../../src/utils";

const getRequest = () => {
  return request(app);
};

describe("tests for /users_courses_bindings", () => {
  beforeEach(async () => {
    await getRequest().delete(`${RouterPath.__test__}/data`);
  });

  it(`should create entity with incorrect input data`, async () => {
    const createUserResult = userTestManager.createUser({ userName: "Dimich" });
    const createCourseResult = coursesTestManager.createCourse({
      title: "Back-end",
    });
    const data: CreateUseCourseBindingrModel = {
      userId: (await createUserResult).createdEntity.id,
      courseId: (await createCourseResult).createdEntity.id,
    };
    await usersCoursesBindingsTestManager.createBinding(data);
  });

  it(`shouldn't create course binding because CourseBinding is already exist`, async () => {
    const createUserResult = userTestManager.createUser({ userName: "Dimich" });
    const createCourseResult = coursesTestManager.createCourse({
      title: "Back-end",
    });
    const data: CreateUseCourseBindingrModel = {
      userId: (await createUserResult).createdEntity.id,
      courseId: (await createCourseResult).createdEntity.id,
    };

    await usersCoursesBindingsTestManager.createBinding(data);

	await usersCoursesBindingsTestManager.createBinding(data, HTTP_STATUS.BAD_REQUEST_400);
  });

  afterAll(function (done) {
    // server.close()
    done();
  });
});
