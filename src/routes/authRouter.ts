import express from "express";
import {
  forgotPassSendVerifyMail,
  login,
  registerUser,
  resendVerificationCode,
  verifyForgotPasswordEmail,
  verifyMail,
} from "../controllers/authController";
import {
  registerValidation,
  validate,
  verifyForgotPasswordValidation,
} from "../middleware/authValidation";

const authRouter = express.Router();

authRouter.post("/auth/register", registerValidation, validate, registerUser);
authRouter.post("/auth/verify", verifyMail);
authRouter.post("/auth/verify/resend", resendVerificationCode);

authRouter.post("/auth/password/forgot/send-otp", forgotPassSendVerifyMail);
authRouter.post(
  "/auth/password/forgot/reset",
  verifyForgotPasswordValidation,
  verifyForgotPasswordEmail
);

authRouter.post("/auth/login", login);

export default authRouter;
