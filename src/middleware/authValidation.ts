import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
import { decodeToken } from "../utils/jwt";
import { AuthRequest } from "../types/authRequest";
import { UserRole } from "../constants/enum";
// Register validation
export const registerValidation = [
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
];

// validateForgotPassword.ts
export const verifyForgotPasswordValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("forgotPasswordToken")
    .notEmpty()
    .withMessage("Verification code is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 8 characters"),
];

// Verify Access Token (protect routes)
export const verifyAccessToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Missing token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = decodeToken(token);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};
// Only OWNER can perform actions
export const validateOwnerToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = decodeToken(token);

    if (decoded.role !== UserRole.OWNER) {
      return res.status(403).json({
        message: "Forbidden: only owner can perform this action",
      });
    }
    // attach decoded user to req for later usage
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => ({
        field: "path" in err ? err.path : "unknown",
        message: err.msg,
      })),
    });
  }

  return next();
};
