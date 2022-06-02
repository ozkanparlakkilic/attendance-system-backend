import classes from '../data/classData.js';
import admins from '../data/adminData.js';
import students from '../data/studentData.js';
import teachers from '../data/teacherData.js';

import Class from '../models/classModel.js';
import Admin from '../models/adminModel.js';
import Teacher from '../models/teacherModel.js';
import Student from '../models/studentModel.js';

import connectDB from '../config/keys.js';

connectDB();

const importData = async () => {
	try {
		const createdClasses = await Class.insertMany(classes);
		const createdTeachers = await Teacher.insertMany(teachers);
		const createdAdmins = await Admin.insertMany(admins);
		const createdStudents = await Student.insertMany(students);

		console.log('Data Imported!');
		process.exit();
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Class.deleteMany();
		await Teacher.deleteMany();
		await Admin.deleteMany();
		await Student.deleteMany();
		console.log('Data Destroyed!');
		process.exit();
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
