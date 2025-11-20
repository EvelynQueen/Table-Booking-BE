import { body } from "express-validator";

export const floorValidation = [
  body("floor")
    .notEmpty()
    .withMessage("Floor is required!")
    .isInt({ min: -1, max: 100 })
    .withMessage("Floor must be between -1 and 100!"),

  body("name")
    .notEmpty()
    .withMessage("Floor name is required!")
    .isLength({ min: 2, max: 200 })
    .withMessage("Name must be 2-200 characters"),

  body("description")
    .isLength({ min: 5, max: 500 })
    .withMessage("Description must be 2-500 characters"),
];
