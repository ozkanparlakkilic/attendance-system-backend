import asyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';

// @route   POST /api/student/register
// @access  Private/Admin
const registerStudent = asyncHandler(async (req, res) => {
  const { classes, usn, email, fullName, images } = req.body;

  const studentExists = await Student.findOne({ email });

  if (studentExists) {
    res.status(400);
    throw new Error('Student already exists');
  }

  const student = await Student.create({
    classes,
    usn,
    email,
    fullName,
    images,
    addedBy: req.admin._id,
  });

  if (student) {
    res.status(201).json({
      student,
    });
  } else {
    res.status(400);
    throw new Error('Invalid student data');
  }
});

// @route   GET /api/student
// @access  Public
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({});
  res.json(students);
});

// @route   GET /api/student/:id
// @access  Private
const getStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    res.json({
      student,
    });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

// @route   GET /api/student/byClass/:class_id
// @access  Private
const getStudentsByClass = asyncHandler(async (req, res) => {
  const students = await Student.find({ classes: req.params.class_id });

  if (students) {
    res.json({
      students,
    });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

// @route   DELETE /api/student/:id
// @access  Private
const deletedStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    await student.remove();
    res.json({ message: 'Student removed by admin' });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

export { registerStudent, getStudents, getStudentProfile, getStudentsByClass,deletedStudent };
