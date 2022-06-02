import express from 'express';
const router = express.Router();
import {
	enteredClasses,
	deletedClasses,
	getClasses,
	getClass,
	updateClass,
	getClassesByTeacher
} from '../controllers/classController.js';
import { protect, admin, teacher } from '../middleware/authMiddleware.js';

router.route('/teacher').get(protect, teacher, getClassesByTeacher);
router.route('/add').post(protect, admin, enteredClasses);
router.route('/:id').get(protect, getClass).delete(protect, admin, deletedClasses).put(protect, admin, updateClass);
router.route('/').get(admin, getClasses);
export default router;
