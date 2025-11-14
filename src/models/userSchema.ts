import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user";
import { UserRole } from "../constants/enum";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
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
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
    },
    tableReservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
    phoneNumber: { type: String, length: 10 },
    accessToken: String,
    refreshToken: String,
    forgotPasswordToken: String,
    forgotPasswordExpires: Date,
    verifyCode: String,
    verifyExpires: String,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
