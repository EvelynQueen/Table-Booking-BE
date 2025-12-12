import mongoose from "mongoose";

export interface IMenu {
  type: mongoose.Types.ObjectId;
  name: string;
  price: string;
  image: string;
  status: string;
  description?: string;
}
