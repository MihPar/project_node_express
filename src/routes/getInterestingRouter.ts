
import express from 'express'
import { DBType } from "../db/db";
import { RequestWithParams, RequestWithQuery } from "../types";
import { QueryCourseModel } from '../features/courses/models/QueryCoursesModel';
import { URIParamsCourseIdModel } from '../features/courses/models/URIParamsCourseIdModel';


export const getInterestingRouter = (db: DBType) => {
	const router = express.Router();
  
	router.get('/books', (req: RequestWithQuery<QueryCourseModel>, res) => {
	  res.json({ title: "it's books handler" });
	});
  
	router.get('/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res) => {
	  res.json({ title: "data by id: " + req.params.id });
	});
  
	return router;
  };