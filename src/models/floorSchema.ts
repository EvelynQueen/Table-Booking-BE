import mongoose, { Schema } from "mongoose";
import { IFloor } from "../types/floors";
import { FloorStatus } from "../constants/enum";

const FloorSchema = new Schema<IFloor>({
  floor: { type: Number, required: true },
  name: { type: String, required: true, minLength: 5, maxLength: 200 },
  status: {
    type: String,
    enum: Object.values(FloorStatus),
    default: FloorStatus.OPEN,
  },
  description: { type: String, minLength: 5, maxLength: 500 },
});

export const Floor =
  mongoose.models.Floor || mongoose.model<IFloor>("Floor", FloorSchema);
