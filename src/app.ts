import express from "express";
import { db } from "./db/db";
import { getCoursesRouter } from "./features/courses/courses.router";
import { getUsersRouter } from "./features/users/users.router";
import { getTestsRouter } from "./routes/tests";
import { getUsersCoursesBindingsRouter } from "./features/users_courses_bindings/users_courses_binding_router";
// import { getInterestingRouter } from "./routes/getInterestingRouter";

export const app = express();

export const middleware = express.json();
app.use(middleware);

export const RouterPath = {
	courses: '/coureses',
	users: 'users',
	usersCoursesBindings: '/users_courses_bindings',
	__test__: '/__test__',
}

app.use(RouterPath.courses, getCoursesRouter(db))
app.use(RouterPath.users, getUsersRouter(db))
app.use(RouterPath.__test__, getTestsRouter(db))
app.use(RouterPath.usersCoursesBindings, getUsersCoursesBindingsRouter(db))
// app.use('/interesting', getInterestingRouter(db))

