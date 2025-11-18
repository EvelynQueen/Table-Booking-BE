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
  forgotPasswordCreated?: Date;
  forgotPasswordExpires?: Date;
  verifyCode?: string;
  verifyCreated?: Date;
  verifyExpires?: Date;
  verified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
