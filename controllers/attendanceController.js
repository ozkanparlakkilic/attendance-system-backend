import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Attendance from "../models/attendanceModel.js";
import Student from "../models/studentModel.js";

// @route   POST /api/attendance/start
const startAttendance = asyncHandler(async (req, res) => {
  const { classId } = req.body;

  const attendance = await Attendance.create({
    classId: classId,
    absent: [],
    isOnline: true,
  });

  const createdAttendance = await attendance.save();
  if (createdAttendance) {
    res.status(201).json({
      createdAttendance,
    });
  } else {
    res.status(400);
    throw new Error("Invalid attendance data");
  }
});

// @route   PUT /api/attendance/add/
const updateAttendance = asyncHandler(async (req, res) => {
  const { attendanceId, student } = req.body;
  try {
    const isStudentInAbsent = await Attendance.findOne({
      _id: attendanceId,
      absent: { $in: [student._id] },
    });

    if (!isStudentInAbsent) {
      const attendance = await Attendance.findByIdAndUpdate(
        attendanceId,
        {
          $push: { absent: student },
        },
        { new: true }
      );
      res.status(201).send(attendance);
      return;
    }
    res.status(400).send({ error: "Student already taken attendance" });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// @route   PUT /api/attendance/finish/
const finishAttendance = asyncHandler(async (req, res) => {
  const { classId } = req.body;

  const attendance = await Attendance.findOneAndUpdate(
    {
      classId: classId,
      isOnline: true,
    },
    { isOnline: false },
    { new: true }
  );

  const createdAttendance = await attendance.save();
  if (createdAttendance) {
    res.status(201).json({
      createdAttendance,
    });
  } else {
    res.status(400);
    throw new Error("Invalid attendance data");
  }
});

// @route   GET /api/attendance/:id
// @access  Private
const getAttendanceByClassId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const attendance = await Attendance.findOne({
    classId: id,
    isOnline: true,
  });

  if (attendance) {
    res.json({
      attendance,
    });
  } else {
    res.status(404);
    throw new Error("Attendance not found");
  }
});

// // @route   GET /api/attendance/classIdArr=id1_id2_id_3
// // @access  Private
const getAttendanceByClasses = asyncHandler(async (req, res) => {
  const { classIdArr } = req.query;

  const attendance = await Attendance.find({
    classId: { $in: classIdArr.split("_") },
    isOnline: false,
  })
    .sort({ createdAt: "asc" })
    .exec();

  if (attendance) {
    res.json({
      attendance,
    });
  } else {
    res.status(404);
    throw new Error("Attendance not found");
  }
});

// // @route   GET /api/attendance/students?classIdArr=id1_id2_id_3
const getAttendanceByClassIdWithStudents = asyncHandler(async (req, res) => {
  const { classIdArr } = req.query;

  const attendance = await Attendance.find({
    classId: { $in: classIdArr.split("_") },
    isOnline: false,
  })
    .populate("absent")
    .sort({ createdAt: "asc" })
    .exec();

  if (attendance) {
    res.json({
      attendance,
    });
  } else {
    res.status(404);
    throw new Error("Attendance not found");
  }
});

export {
  startAttendance,
  getAttendanceByClasses,
  getAttendanceByClassId,
  getAttendanceByClassIdWithStudents,
  updateAttendance,
  finishAttendance,
};
