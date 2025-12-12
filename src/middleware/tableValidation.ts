import { body } from "express-validator";
import { Floor } from "../models/floorSchema";

export const createTableValidation = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Table code is required!")
    .isLength({ min: 1, max: 10 })
    .withMessage("Table code must be between 1-10 characters!"),

  body("floorId")
    .trim()
    .notEmpty()
    .withMessage("Floor is required!")
    .custom(async (value) => {
      const exists = await Floor.findById(value);
      if (!exists) {
        throw new Error("Floor not found!");
      }
      return true;
    }),

  body("seat")
    .notEmpty()
    .withMessage("Seat is required!")
    .isInt({ min: 1 })
    .withMessage("Seat must be a positive number"),

  body("description")
    .optional()
    .isLength({ min: 5, max: 500 })
    .withMessage("Description must be between 5-500 characters"),
];
