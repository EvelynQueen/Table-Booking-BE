import mongoose, { Schema } from "mongoose";
import { IFoodCategory } from "../types/foodCategory";

const foodCategorySchema = new Schema<IFoodCategory>({
  category: { type: String, minLength: 1, maxLength: 20, required: true },
  description: { type: String, minLength: 1, maxLength: 200 },
});

export const FoodCategory =
  mongoose.models.FoodCategory ||
  mongoose.model<IFoodCategory>("FoodCategory", foodCategorySchema);
