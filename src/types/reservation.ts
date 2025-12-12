import mongoose from "mongoose";

export interface IReservation {
  user: mongoose.Types.ObjectId;
  table: mongoose.Types.ObjectId;
  date: Date;
  startTime: Date;
  endTime: Date;
  guests: number;
  status: string;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}
