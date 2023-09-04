import express from "express";
import { db } from "./db/db";
import { getCoursesRouter } from "./routes/courses";
import { getTestsRouter } from "./routes/tests";
import { getInterestingRouter } from "./routes/getInterestingRouter";

export const app = express();

export const middleware = express.json();
app.use(middleware);

app.use('/courses', getCoursesRouter(db))
app.use('/__test__', getTestsRouter(db))
app.use('/interesting', getInterestingRouter(db))

