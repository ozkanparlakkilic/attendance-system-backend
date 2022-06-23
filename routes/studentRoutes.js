import express from "express";
import multer from "multer";
const router = express.Router();
import {
  registerStudent,
  getStudentProfile,
  getStudents,
  getStudentsByClass,
  deletedStudent,
  authStudent,
} from "../controllers/studentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import Student from "../models/studentModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "images"));
  },
  filename: async function (req, file, cb) {
    const { usn, email } = req.body;

    const studentExists = await Student.findOne({ email });

    if (studentExists) {
      const error = new Error("Student already exists");
      cb(error);
    } else {
      cb(null, "" + usn + ".png");
    }
  },
});

router.post(
  "/register",
  multer({
    storage,
  }).single("image"),
  registerStudent
);
router.route("/login").post(authStudent);
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));
router
  .route("/:id")
  .get(protect, getStudentProfile)
  .delete(protect, admin, deletedStudent);
router.get("/", getStudents);
router;
router.route("/byClass/:class_id").get(getStudentsByClass);
export default router;

//1.Given a class id,get all the students enrolled in that particular class
