import mongoose, { Schema } from "mongoose";
import { IReservation } from "../types/reservation";
import { ReservationStatus } from "../constants/enum";

const reservationSchema = new Schema<IReservation>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    table: { type: Schema.Types.ObjectId, ref: "Table", required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    guests: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(ReservationStatus),
      default: ReservationStatus.RESERVED,
    },
    note: { type: String },
  },
  { timestamps: true }
);

export const Reservation =
  mongoose.models.Reservation ||
  mongoose.model<IReservation>("Reservation", reservationSchema);
