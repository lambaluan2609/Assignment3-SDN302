import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentCode: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true }
});

const studentModel = mongoose.models.student || mongoose.model("students", studentSchema)

export default studentModel;