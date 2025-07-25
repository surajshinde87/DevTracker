// models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string;
  role: string;
  skills: string[];
  aiRoadmap?: string;
  editedRoadmap?: string;
  authProvider: "credentials" | "google" | "github";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.authProvider === "credentials";
      },
    },
    role: {
      type: String,
      default: "user",
    },
    skills: {
      type: [String],
      default: [],
    },
    aiRoadmap: {
      type: String,
      default: "",
    },
    editedRoadmap: {
      type: String,
      default: "",
    },
    authProvider: {
      type: String,
      enum: ["credentials", "google", "github"],
      default: "credentials",
    },
  },
  { timestamps: true }
);

// Avoid model overwrite error in Next.js dev mode
const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
