import mongoose, { Schema } from "mongoose";
import { IOrder, IOrderItem } from "../types/order";
import { OrderStatus } from "../constants/enum";

const orderItemSchema = new Schema<IOrderItem>(
  {
    menuItemId: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    quantity: { type: Number, default: 1 },
    note: String,
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>({
  tableSessionId: {
    type: Schema.Types.ObjectId,
    ref: "TableSession",
    required: true,
  },

  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  },

  order: {
    type: [orderItemSchema],
    default: [],
  },

  note: String,
});

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);
