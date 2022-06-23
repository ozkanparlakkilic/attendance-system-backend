import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import Teacher from "../models/teacherModel.js";
import Student from "../models/studentModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);

      let userData =
        (await Admin.findById(decoded.id).select("-password")) ||
        (await Teacher.findById(decoded.id).select("-password")) ||
        (await Student.findById(decoded.id).select("-password"));
      if (!userData) {
        res.status(401);
        throw new Error("Not authorized, Not Admin");
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, "secret");

      req.admin = await Admin.findById(decoded.id).select("-password");
      if (!req.admin) {
        res.status(401);
        throw new Error("Not authorized, Not Admin");
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error(error.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const teacher = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, "secret");

      req.teacher = await Teacher.findById(decoded.id).select("-password");
      if (!req.teacher) {
        res.status(401);
        throw new Error("Not authorized, Not teacher");
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error(error.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
export { protect, admin, teacher };
