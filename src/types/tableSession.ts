import mongoose from "mongoose";

export interface ITableSession {
  tableId: mongoose.Types.ObjectId;
  type: string;
  status: string;
  timeStart: Date;
  timeEnd: Date;
}
