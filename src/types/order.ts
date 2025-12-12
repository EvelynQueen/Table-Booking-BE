import mongoose from "mongoose";

export interface IOrderItem {
  menuItemId: mongoose.Types.ObjectId;
  quantity: number;
  note?: string;
}

export interface IOrder {
  tableSessionId: mongoose.Types.ObjectId;
  status: string;
  order: IOrderItem[];
  note?: string;
}
