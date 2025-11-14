import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  tableReservations?: mongoose.Types.ObjectId[];
  role: string;
  phoneNumber?: string;
  accessToken?: string;
  refreshToken?: string;
  forgotPasswordToken?: string;
  forgotPasswordExpires?: Date;
  verifyCode?: string;
  verifyExpires?: string;
  verified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
