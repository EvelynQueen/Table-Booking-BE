import express from "express";
import { createStaffValidation } from "../middleware/staffValidation";
import { createStaff, deleteStaff } from "../controllers/staffController";
import { validateRequest } from "../middleware/validateRequest";
import { validateOwnerToken } from "../middleware/authValidation";

const userRouter = express.Router();

// Owner creates staff
userRouter.post(
  "/staff/create",
  validateOwnerToken,
  createStaffValidation,
  validateRequest,
  createStaff
);
// Owner deletes staff
userRouter.delete("/staff/delete/:id", validateOwnerToken, deleteStaff);

export default userRouter;
