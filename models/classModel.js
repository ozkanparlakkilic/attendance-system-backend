import mongoose from "mongoose";

const classSchema = mongoose.Schema({
  classId: {
    type: String,
    required: true,
    unique: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
});

const Class = mongoose.model("class", classSchema);

export default Class;
