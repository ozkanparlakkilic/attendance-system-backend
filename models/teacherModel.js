import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const teacherSchema = mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  classes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'class',
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
    required: true,
  },
});

teacherSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const Teacher = mongoose.model('teachers', teacherSchema);

export default Teacher;
