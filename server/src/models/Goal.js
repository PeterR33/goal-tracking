import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    priority: { type: Number, enum: [1, 2, 3], default: 3 },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
