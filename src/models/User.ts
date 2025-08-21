import mongoose, { Document, Schema,model } from "mongoose";
import bcrypt from "bcryptjs";

// Extend Document so mongoose knows about instance methods
export interface UserDocument extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// Check if a 'User' model already exists in mongoose.models (important for Next.js hot reloads)
// If it exists, reuse it. Otherwise, create a new model from the UserSchema.
// Using TypeScript generic <UserDocument> ensures type safety for the model's documents.

const  User  =  mongoose.models?.User  ||  model<UserDocument>('User', UserSchema);
export  default  User;