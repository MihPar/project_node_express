import { Response, Express } from "express";
import { CourseViewModel } from "../models/CourseViewModel"; 
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "../types";
import { QueryCourseModel } from "../models/QueryCoursesModel";
import { URIParamsCourseIdModel } from "../models/URIParamsCourseIdModel";
import { CreateCourseModel } from "../models/CreateCourseModel";
import { UpdataCourseModel } from "../models/UpdataCourseModel";
import { CoursesType, DBType, db } from "../db/db";
import express from 'express'


  export const HTTP_STATUS = {
	OK_200: 200,
	CREATED_201: 201,
	NO_CONTANT_204: 204,
  
	BAD_REQUEST_400: 400,
	NOT_FOUND_404: 404,
  };
  
export const getCourseViewModel = (dbCourse: CoursesType): CourseViewModel => {
	  return {
		  id: dbCourse.id,
		  title: dbCourse.title,
		};
}


export const getCoursesRouter = (db: DBType) => {
	const router = express.Router() 

router.get(
	"/",
	(
	  req: RequestWithQuery<QueryCourseModel>,
	  res: Response<CourseViewModel[]>
	) => {
	  let foundCourses = db.courses;
  
	  if (req.query.title) {
		foundCourses = foundCourses.filter(function (c) {
		  return c.title.indexOf(req.query.title) > -1;
		});
	  }
  
	  res.json(
		foundCourses.map(getCourseViewModel));
	  }
  )
  router.get(
	"/:id",
	(
	  req: RequestWithParams<URIParamsCourseIdModel>,
	  res: Response<CourseViewModel>
	) => {
	  const foundCourse = db.courses.find(function (c) {
		return c.id === Number(req.params.id);
	  });
	  if (!foundCourse) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
		return;
	  }
	  res.json(getCourseViewModel(foundCourse));
	}
  );
  
  router.post(
	"/",
	(req: RequestWithBody<CreateCourseModel>, res: Response<CourseViewModel>) => {
	  if (!req.body.title) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
		return;
	  }
	  const createCourses: CoursesType = {
		id: Number(new Date()),
		title: req.body.title,
		studentsCount: 0,
	  };
	  db.courses.push(createCourses);
	  res.status(201).json(getCourseViewModel(createCourses));
	}
  );
  
  router.delete(
	"/:id",
	function (req: RequestWithParams<URIParamsCourseIdModel>, res: Response) {
	  db.courses = db.courses.filter(function (c) {
		return c.id !== +req.params.id;
	  });
	  res.sendStatus(204);
	}
  );
  
  router.put(
	"/:id",
	function (
	  req: RequestWithParamsAndBody<URIParamsCourseIdModel, UpdataCourseModel>,
	  res: Response
	) {
	  if (!req.body.title) {
		res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
		return;
	  }
	  const foundCourses = db.courses.find(function (c) {
		return c.id === Number(req.params.id);
	  });
	  if (!foundCourses) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
		return;
	  }
	  foundCourses.title = req.body.title;
	  res.sendStatus(204);
	}
  );
  
  return router

}