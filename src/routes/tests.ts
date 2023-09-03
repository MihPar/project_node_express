import { Express } from "express";
import { HTTP_STATUS } from "./courses";
import { DBType } from "../db/db";
import express from 'express'

export const getTestsRouter = (db: DBType) => {
	const router = express.Router() 

	router.delete("/data", (req, res) => {
		db.courses = [];
		res.sendStatus(HTTP_STATUS.NO_CONTANT_204);
	  });
	  return router
}

  