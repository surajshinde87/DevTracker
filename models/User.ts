import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: string;
  skills: string[];
  aiRoadmap?: string;
  editedRoadmap?: string;
  authProvider: 'credentials' | 'google' | 'github';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
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
    },
    password: {
  type: String,
  required: function (this: any) {
    return this.authProvider === 'credentials';
  },
},
    role: {
      type: String,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    aiRoadmap: {
      type: String,
      default: '',
    },
    editedRoadmap: {
      type: String,
      default: '',
    },
    authProvider: {
  type: String as () => 'credentials' | 'google' | 'github',
  enum: ['credentials', 'google', 'github'],
  default: 'credentials',
},

  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
