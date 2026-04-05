import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  location: string[];
  team: string;
  vacancies: number;
  workingHours: string;
  requirements: string[];
  status: "active" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: [{ type: String, required: true }],
    team: { type: String, required: true },
    vacancies: { type: Number, required: true, default: 1 },
    workingHours: { type: String, default: "9 hours" },
    requirements: [{ type: String }],
    status: { type: String, enum: ["active", "closed"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
