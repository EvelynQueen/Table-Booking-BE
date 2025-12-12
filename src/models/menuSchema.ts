import mongoose, { Schema } from "mongoose";
import { MenuStatus } from "../constants/enum";
import { IMenu } from "../types/menu";

const menuSchema = new Schema<IMenu>({
  type: { type: Schema.Types.ObjectId, ref: "FoodCategory", required: true },
  name: { type: String, required: true, minLength: 1, maxLength: 40 },
  price: { type: String, required: true },
  image: String,
  status: {
    type: String,
    enum: Object.values(MenuStatus),
    default: MenuStatus.AVAILABLE,
  },
  description: { type: String, minLength: 1, maxLength: 100 },
});

export const MenuSchema =
  mongoose.models.MenuSchema || mongoose.model<IMenu>("Menu", menuSchema);
