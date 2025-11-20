import { body } from "express-validator";
import { UserRole } from "../constants/enum";

// Validate staff creation inputs
export const createStaffValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2-50 characters"),

  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn([UserRole.STAFF, UserRole.OWNER])
    .withMessage("Role must be staff or owner"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("vi-VN")
    .withMessage("Invalid Vietnamese mobile number"),
];
