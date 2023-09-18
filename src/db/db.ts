export type CoursesType = {
	id: number;
	title: string;
	studentsCount: number;
  };

export type UserType = {
	id: number;
	userName: string;
}

export type UserCourseBindingType = {
	userId: number;
	courseId: number;
	date: Date;
}

  export const db: DBType = {
	courses: [
	  { id: 1, title: "front-end", studentsCount: 10 },
	  { id: 2, title: "back-end", studentsCount: 10 },
	  { id: 3, title: "SQL", studentsCount: 10 },
	  { id: 4, title: "PYTHON", studentsCount: 10 },
	],
	users: [
		{id: 1, userName: 'Mickhal'},
		{id: 2, userName: 'Tatiana'}
	],
	userCourseBinding: [
		{userId: 1, courseId: 1, date: new Date(2022, 10, 1)},
		{userId: 2, courseId: 2, date: new Date(2022, 10,1)},
		{userId: 3, courseId: 2, date: new Date(2022, 10, 1)},
	]
  };

  export type DBType = {courses: CoursesType[], users: UserType[], userCourseBinding: UserCourseBindingType[]}