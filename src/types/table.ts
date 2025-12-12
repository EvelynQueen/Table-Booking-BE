import mongoose from "mongoose";

export interface ITable {
  code: string;
  floorId: mongoose.Types.ObjectId;
  seat: number;
  status: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
