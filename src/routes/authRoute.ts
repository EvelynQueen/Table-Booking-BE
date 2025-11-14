import express from "express";
import { registerUser, verifyMail } from "../controllers/authController";
import { registerValidation, validate } from "../middleware/authValidation";

const authRouter = express.Router();

authRouter.post("/auth/register", registerValidation, validate, registerUser);
authRouter.post("/auth/verifications", verifyMail);
export default authRouter;
