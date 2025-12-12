import mongoose, { Schema, Model } from "mongoose";
import { ITable } from "../types/table";
import { TableStatus } from "../constants/enum";

const TableSchema = new Schema<ITable>(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 10,
    },
    floorId: {
      type: Schema.Types.ObjectId,
      ref: "Floor",
      required: true,
    },
    seat: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: Object.values(TableStatus),
      default: TableStatus.AVAILABLE,
    },
    description: { type: String, minLength: 5, maxLength: 500 },
  },
  { timestamps: true }
);

export const Table: Model<ITable> = mongoose.model<ITable>(
  "Table",
  TableSchema
);
