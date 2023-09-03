import express from "express";
import { db } from "./db/db";
import { getCoursesRouter } from "./routes/courses";
import { getTestsRouter } from "./routes/tests";

export const app = express();

export const middleware = express.json();
app.use(middleware);

const coursesRouter = getCoursesRouter(db)
const testRouter = getTestsRouter(db)
app.use('/courses', coursesRouter)
app.use('/__test__', testRouter)

