import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Admin from "../models/adminModel.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import generator from "generate-password";
import dotenv from "dotenv";
dotenv.config();

// @route   POST /api/admin/login
// @access  Private/Admin
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route   GET /api/class/:id
// @access  Private/Admin
const getClass = asyncHandler(async (req, res) => {
  const cls = await Class.findById(req.params.id);
  if (cls) {
    res.json(cls);
  } else {
    res.status(404);
    throw new Error("Class not found");
  }
});

// @route   POST /api/admin/register
// @access  Private/Admin
const registerAdmin = asyncHandler(async (req, res) => {
  const { empId, fullname, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = await Admin.create({
    empId,
    fullname,
    email,
    password,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      empId: admin.empId,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route   GET /api/admin/profile
// @access  Private
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json({
      _id: admin._id,
      empId: admin.empId,
      fullname: admin.name,
      email: admin.email,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

// @route   PUT /api/admin/forgotPassword
// @access  Public/Admin
const changePassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  const otp = generator.generate({
    length: 6,
    numbers: true,
    uppercase: true,
    lowercase: false,
  });

  if (admin) {
    admin.resetPasswordOTP = otp;
    const changePassword = await admin.save();
    res.json(changePassword);
  } else {
    console.error("email not in database");
    res.status(403).send("email not in db");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: false,
    auth: {
      type: "login",
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "Tech Adminstrator <attendancesystemconfig@gmail.com>",
    to: `${admin.email}`,
    subject: "OTP To Reset Password",
    html:
      "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please enter the code in the app,within ten minutes of receiving it.\n" +
      "<h3>OTP for resetting is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>" +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n",
  };

  console.log("sending mail");

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error("there was an error: ", err);
    } else {
      console.log("here is the res: ", response);
      res.status(200).json("recovery email sent");
    }
  });
});

// @route   PUT /api/admin/reset
// @access  Public/Admin
const resetPassword = asyncHandler(async (req, res) => {
  const { password, otp } = req.body;

  const admin = await Admin.findOne({
    resetPasswordOTP: otp,
  });

  if (admin) {
    admin.password = password;

    const updatedPassword = await admin.save();
    res.json(updatedPassword);
  } else {
    res.status(404);
    throw new Error("Admin not found or OTP expired");
  }
});

export {
  authAdmin,
  registerAdmin,
  getAdminProfile,
  changePassword,
  resetPassword,
};
