import { Response} from "express";
import { RequestWithBody } from "../../types";
import { CoursesType, DBType, UserCourseBindingType, UserType} from "../../db/db";
import express from 'express'
import { HTTP_STATUS } from "../../utils";
import { UserCourseBindingViewModel } from "./models/UserCourseBindingViewModel";
import { CreateUseCourseBindingrModel } from "./models/CreateCourseUserBoindingModel";

export const mapEntityToViewModel = (dbEntity: UserCourseBindingType, user: UserType, course: CoursesType): UserCourseBindingViewModel => {
	  return {
		  userId: dbEntity.userId,
		  courseId: dbEntity.courseId,
		  userName: user.userName,
		  courseTitle: course.title,
		};
}


export const getUsersCoursesBindingsRouter = (db: DBType) => {
	const router = express.Router() 

  router.post(
	"/",
	(req: RequestWithBody<CreateUseCourseBindingrModel>, res: Response<UserCourseBindingViewModel>) => {
	  

	  const user = db.users.find(u => u.id === req.body.userId)
	  const course = db.courses.find(c => c.id === req.body.courseId)

	  if (!user || !course) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
		return;
	  }

	  const alreadyExistBinding = db.userCourseBinding
	  .find(b => b.userId === user.id && b.courseId === course.id)

	  if (!!alreadyExistBinding) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
		return;
	  }

	  const createdEntity: UserCourseBindingType = {
		userId: user.id,
		courseId: course.id,
		date: new Date( )
	  };
	  
	  db.userCourseBinding.push(createdEntity);
	  res.status(201).json(mapEntityToViewModel(createdEntity, user, course));
	}
  );
  return router
}