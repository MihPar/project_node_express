export type CoursesType = {
	id: number;
	title: string;
	studentsCount: number;
  };

  export type UserType = {
	id: number;
	title: string;
	studentsCount: number;
  };

export type userType = {
	id: number;
	userName: string;
}

export type StudentCourseBinding = {
	studentId: number;
	coureseId: number;
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
	studentCourseBinding: [
		{studentId: 1, coureseId: 1, date: new Date(2022, 10, 1)},
		{studentId: 2, coureseId: 2, date: new Date(2022, 10,1)},
		{studentId: 3, coureseId: 3, date: new Date(2022, 10, 1)},
	]
  };

  export type DBType = {courses: CoursesType[], users: userType[], studentCourseBinding: StudentCourseBinding[]}