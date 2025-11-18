import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { AuthRequest } from "../types/authRequest";
import jwt from "jsonwebtoken";
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

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array().map((err) => ({
        field: "path" in err ? err.path : "unknown",
        message: err.msg,
      })),
    });
    return;
  }
  return next();
};

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
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as { userId: string; role: string };
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};

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
