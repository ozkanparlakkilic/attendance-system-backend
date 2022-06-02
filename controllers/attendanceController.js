import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Attendance from '../models/attendanceModel.js';

// @route   POST /api/attendance/register
// @access  Private/Admin
const enterAttendance = asyncHandler(async (req, res) => {
	const { classId, absent } = req.body;
	const attendance = new Attendance({
		classId: classId,
		absent: absent
	});
	const createdAttendance = await attendance.save();
	if (createdAttendance) {
		res.status(201).json({
			createdAttendance
		});
	} else {
		res.status(400);
		throw new Error('Invalid attendance data');
	}
});

// @route   PUT /api/attendance/register/:id
// @access  Private/Admin
const updateAttendance = asyncHandler(async (req, res) => {
	const { absent } = req.body;

	const attendance = await Attendance.findById(req.params.id);
	if (attendance) {
		attendance.absent = absent;
		const createdAttendance = await attendance.save();
		if (createdAttendance) {
			res.status(201).json({
				createdAttendance
			});
		} else {
			res.status(400);
			throw new Error('Invalid attendance data');
		}
	} else {
		throw new Error('Attendance Document not found');
	}
});

// @route   GET /api/attendance/byClass/:class_id
// @access  Private
const getAttendanceByClass = asyncHandler(async (req, res) => {
	const attendance = await Attendance.find({ classId: req.params.class_id }).sort({ createdAt: 'desc' });

	if (attendance) {
		res.json({
			attendance
		});
	} else {
		res.status(404);
		throw new Error('Student not found');
	}
});

// @route   GET /api/attendance/byClass/lm/:class_id
// @access  Private
const getAttendanceLimited = asyncHandler(async (req, res) => {
	const attendance = await Attendance.find({
		classId: req.params.class_id
	})
		.sort({ createdAt: 'desc' })
		.limit(20);

	if (attendance) {
		res.json({
			attendance
		});
	} else {
		res.status(404);
		throw new Error('Student not found');
	}
});

export { enterAttendance, getAttendanceByClass, getAttendanceLimited, updateAttendance };
