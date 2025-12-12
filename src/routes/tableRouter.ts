import express from "express";
import { createTableValidation } from "../middleware/tableValidation";
import { validateRequest } from "../middleware/validateRequest";
import {
  createTable,
  deleteTable,
  getAllTable,
} from "../controllers/tableController";
import { validateOwnerToken } from "../middleware/authValidation";
const tableRouter = express.Router();

tableRouter.post(
  "/table/create",
  validateOwnerToken,
  createTableValidation,
  validateRequest,
  createTable
);

tableRouter.delete("/table/delete/:id", validateOwnerToken, deleteTable);
tableRouter.get("/table/list", getAllTable);

export default tableRouter;
