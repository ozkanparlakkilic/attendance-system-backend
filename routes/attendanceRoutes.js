import express from 'express';
const router = express.Router();
import {
	enterAttendance,
	getAttendanceByClass,
	getAttendanceLimited,
	updateAttendance
} from '../controllers/attendanceController.js';
import { protect, admin, teacher } from '../middleware/authMiddleware.js';

router.route('/register').post(protect, enterAttendance);
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));
router.route('/byClass/:class_id').get(protect, teacher, getAttendanceByClass);
router.route('/byClass/lm/:class_id').get(protect, teacher, getAttendanceLimited);
router.route('/:id').put(protect, updateAttendance);
export default router;
