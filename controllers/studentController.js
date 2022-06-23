import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import generateToken from "../utils/generateToken.js";

// @route   POST /api/student/register
const registerStudent = asyncHandler(async (req, res) => {
  const { classes, usn, email, password, fullName } = req.body;

  const convertClasses = classes.split(",");

  const studentExists = await Student.findOne({ email });

  const path = "images/" + usn + ".png";

  if (studentExists) {
    res.status(400);
    throw new Error("Student already exists");
  }

  const student = await Student.create({
    classes: convertClasses,
    usn,
    email,
    fullName,
    images: path,
    password,
  });

  const createdStudent = await student.save();
  if (createdStudent) {
    res.status(201).json({
      student,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route   POST /api/student/login
const authStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });
  if (student && (await student.matchPassword(password))) {
    res.json({
      token: generateToken(student._id),
      user: student,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
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
    throw new Error("Student not found");
  }
});

// @route   GET /api/student/byClass/:class_id
const getStudentsByClass = asyncHandler(async (req, res) => {
  const students = await Student.find({ classes: req.params.class_id });

  if (students) {
    res.json({
      students,
    });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

// @route   DELETE /api/student/:id
// @access  Private
const deletedStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    await student.remove();
    res.json({ message: "Student removed by admin" });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

export {
  registerStudent,
  getStudents,
  getStudentProfile,
  getStudentsByClass,
  deletedStudent,
  authStudent,
};
