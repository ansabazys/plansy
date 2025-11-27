import mongoose, { Document, Schema } from "mongoose";

export interface Task {
  _id?: string;
  title: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  labels: string;
  createdAt: Date;
}

export interface ProjectDocument extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  tasks: Task[];
}

const TaskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: { type: Date },
    labels: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const ProjectSchema = new Schema<ProjectDocument>(
  {
    name: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tasks: [TaskSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model<ProjectDocument>("Project", ProjectSchema);
