import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = mongoose.Schema({
  classes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "class",
  },
  usn: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: false,
  },
});

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Student = mongoose.model("students", studentSchema);

export default Student;
