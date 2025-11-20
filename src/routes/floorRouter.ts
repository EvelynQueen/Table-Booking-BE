import express from "express";
import { validateOwnerToken } from "../middleware/authValidation";
import { floorValidation } from "../middleware/floorValidation";
import { validateRequest } from "../middleware/validateRequest";
import { createFloor } from "../controllers/floorController";

const floorRouter = express.Router();

floorRouter.post(
  "/floor/create",
  validateOwnerToken,
  floorValidation,
  validateRequest,
  createFloor
);
export default floorRouter;
