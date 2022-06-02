import asyncHandler from 'express-async-handler';
import Class from '../models/classModel.js';
import Teacher from '../models/teacherModel.js';

// @route   POST /api/class/add
// @access  Private/Admin
const enteredClasses = asyncHandler(async (req, res) => {
	const { classId, subjectName, semester, section, branch } = req.body;

	const classExists = await Class.findOne({ classId });

	if (classExists) {
		res.status(400);
		throw new Error('Class already exists');
	}

	const classroom = await Class.create({
		classId,
		subjectName,
		semester,
		section,
		branch
	});

	if (classroom) {
		res.status(201).json({
			_id: classroom._id,
			classId: classroom.classId,
			subjectName: classroom.subjectName,
			semester: classroom.semester,
			section: classroom.section,
			branch: classroom.branch
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @route   DELETE /api/class/:id
// @access  Private/Admin
const deletedClasses = asyncHandler(async (req, res) => {
	const classes = await Class.findById(req.params.id);

	if (classes) {
		await classes.remove();
		res.json({ message: 'Class removed by admin' });
	} else {
		res.status(404);
		throw new Error('Class not found');
	}
});

// @route   PUT /api/class/:id
// @access  Private/Admin
const updateClass = asyncHandler(async (req, res) => {
	const { classId, subjectName, semester, section, branch } = req.body;

	const classes = await Class.findById(req.params.id);

	if (classes) {
		classes.classId = classId;
		classes.subjectName = subjectName;
		classes.semester = semester;
		classes.section = section;
		classes.branch = branch;

		const updatedClass = await classes.save();
		res.json(updatedClass);
	} else {
		res.status(404);
		throw new Error('Class not found');
	}
});

// @route   GET /api/class/:id
// @access  Private/Admin
const getClass = asyncHandler(async (req, res) => {
	const cls = await Class.findById(req.params.id);
	if (cls) {
		res.json(cls);
	} else {
		res.status(404);
		throw new Error('Class not found');
	}
});

// @route   GET /api/class
// @access  Private/Admin
const getClasses = asyncHandler(async (req, res) => {
	const classes = await Class.find({});
	res.json(classes);
});

// @route   GET /api/class/teacher/
// @access  Private/Admin
const getClassesByTeacher = asyncHandler(async (req, res) => {
	const teacher = await Teacher.findById(req.teacher._id);
	if (teacher) {
		const classes = await Class.find({
			_id: { $in: teacher.classes }
		});
		res.json(classes);
	} else {
		res.status(404);
		throw new Error('Championship not found');
	}
});

export { enteredClasses, deletedClasses, getClasses, getClass, updateClass, getClassesByTeacher };
