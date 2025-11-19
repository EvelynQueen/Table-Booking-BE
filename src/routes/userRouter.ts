import express from "express";
import {
  createStaffValidation,
  validateOwnerToken,
} from "../middleware/userValidation";
import { createStaff, deleteStaff } from "../controllers/staffController";

const userRouter = express.Router();

// Owner creates staff
userRouter.post(
  "/staff/create",
  createStaffValidation,
  validateOwnerToken,
  createStaff
);

// Owner deletes staff
userRouter.delete("/staff/delete/:id", validateOwnerToken, deleteStaff);

export default userRouter;
