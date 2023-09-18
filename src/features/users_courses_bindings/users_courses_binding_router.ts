import { Response} from "express";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "../../types";
import {UserType, DBType} from "../../db/db";
import express from 'express'
import { HTTP_STATUS } from "../../utils";

export const mapEntityToViewModel = (dbEntity: UserType): UserViewModel => {
	  return {
		  id: dbEntity.id,
		  userName: dbEntity.userName,
		};
}


export const getUsersRouter = (db: DBType) => {
	const router = express.Router() 

router.get(
	"/",
	(
	  req: RequestWithQuery<QueryUsersModel>,
	  res: Response<UserViewModel[]>
	) => {
	  let foundEntities = db.users;
  
	  if (req.query.userName) {
		foundEntities = foundEntities.filter(function (c) {
		  return c.userName.indexOf(req.query.userName) > -1;
		});
	  }
  
	  res.json(
		foundEntities.map(mapEntityToViewModel));
	  }
  )
  router.get(
	"/:id",
	(
	  req: RequestWithParams<URIParamsUserIdModel>,
	  res: Response<UserViewModel>
	) => {
	  const foundEntity = db.users.find(function (c) {
		return c.id === Number(req.params.id);
	  });
	  if (!foundEntity) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
		return;
	  }
	  res.json(mapEntityToViewModel(foundEntity));
	}
  );

  router.delete(
	"/:id",
	function (req: RequestWithParams<URIParamsUserIdModel>, res: Response) {
	  db.users = db.users.filter(function (c) {
		return c.id !== +req.params.id;
	  });
	  res.sendStatus(204);
	}
  );
  
  
  router.post(
	"/",
	(req: RequestWithBody<CreateUserModel>, res: Response<UserViewModel>) => {
	  if (!req.body.userName) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
		return;
	  }
	  const createdEntity: UserType = {
		id: Number(new Date()),
		userName: req.body.userName,
	  };
	  
	  db.users.push(createdEntity);
	  res.status(201).json(mapEntityToViewModel(createdEntity));
	}
  );
  
  
  router.put(
	"/:id",
	function (
	  req: RequestWithParamsAndBody<URIParamsUserIdModel, UpdateUserModel>,
	  res: Response
	) {
	  if (!req.body.userName) {
		res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
		return;
	  }
	  const foundUser = db.users.find(function (c) {
		return c.id === Number(req.params.id);
	  });
	  if (!foundUser) {
		res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
		return;
	  }
	  foundUser.userName = req.body.userName;
	  res.sendStatus(204);
	}
  );
  
  return router

}