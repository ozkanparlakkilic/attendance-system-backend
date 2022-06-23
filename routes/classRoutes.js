import express from "express";
const router = express.Router();
import {
  enteredClasses,
  deletedClasses,
  getClasses,
  getClass,
  updateClass,
  getClassesByTeacher,
  getClassesInStudent,
} from "../controllers/classController.js";
import { protect, admin, teacher } from "../middleware/authMiddleware.js";

router.route("/teacher/:id").get(teacher, getClassesByTeacher);
router.route("/student/:id").get(protect, getClassesInStudent);
router.route("/add").post(protect, admin, enteredClasses);
router
  .route("/:id")
  .get(getClass)
  .delete(protect, admin, deletedClasses)
  .put(protect, admin, updateClass);
router.route("/").get(getClasses);
export default router;
