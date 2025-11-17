import express from "express";
import {
  login,
  registerUser,
  resendVerificationCode,
  verifyMail,
} from "../controllers/authController";
import { registerValidation, validate } from "../middleware/authValidation";

const authRouter = express.Router();

authRouter.post("/auth/register", registerValidation, validate, registerUser);
authRouter.post("/auth/verification", verifyMail);
authRouter.post("/auth/reVerification", resendVerificationCode);
authRouter.post("/auth/login", login);
export default authRouter;
