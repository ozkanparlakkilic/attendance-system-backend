import express from "express";
const router = express.Router();
import {
  authTeacher,
  registerTeacher,
  getTeacherProfile,
  getTeacherDetails,
  getTeachers,
  deletedTeacher,
  updatePassword,
} from "../controllers/teacherController.js";
import { protect, teacher, admin } from "../middleware/authMiddleware.js";

router.post("/login", authTeacher);
router.route("/register").post(admin, registerTeacher);
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));
router.route("/profile").get(getTeacherDetails);
router.route("/:id").get(getTeacherProfile).delete(deletedTeacher);
router.get("/", getTeachers);
router.route("/forgot/:id").put(updatePassword);
export default router;

//1.
//2.
