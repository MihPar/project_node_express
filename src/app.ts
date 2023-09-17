import express from "express";
import { db } from "./db/db";
import { getCoursesRouter } from "./routes/courses_router";
import { getUsersRouter } from "./routes/users_router";
import { getTestsRouter } from "./routes/tests";
import { getInterestingRouter } from "./routes/getInterestingRouter";

export const app = express();

export const middleware = express.json();
app.use(middleware);

app.use('/courses', getCoursesRouter(db))
app.use('/users', getUsersRouter(db))
app.use('/__test__', getTestsRouter(db))
app.use('/interesting', getInterestingRouter(db))

export const RouterPath = {
	
}