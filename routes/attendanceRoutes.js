import express from "express";
const router = express.Router();
import {
  finishAttendance,
  getAttendanceByClasses,
  getAttendanceByClassId,
  getAttendanceByClassIdWithStudents,
  startAttendance,
  updateAttendance,
} from "../controllers/attendanceController.js";
import { protect, admin, teacher } from "../middleware/authMiddleware.js";

router.route("/start").post(teacher, startAttendance);
router.route("/add").put(protect, updateAttendance);
router.route("/finish").put(teacher, finishAttendance);

router.route("/students").get(teacher, getAttendanceByClassIdWithStudents);
router.route("/:id").get(protect, getAttendanceByClassId);
router.route("/").get(protect, getAttendanceByClasses);
export default router;
