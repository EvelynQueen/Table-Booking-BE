import express from "express";
import { validateOwnerToken } from "../middleware/authValidation";
import {
  createFloorValidation,
  updateFloorValidation,
} from "../middleware/floorValidation";
import { validateRequest } from "../middleware/validateRequest";
import {
  createFloor,
  deleteFloor,
  updateFloor,
} from "../controllers/floorController";

const floorRouter = express.Router();

floorRouter.post(
  "/floor/create",
  validateOwnerToken,
  createFloorValidation,
  validateRequest,
  createFloor
);

floorRouter.delete("/floor/delete/:id", validateOwnerToken, deleteFloor);

floorRouter.put(
  "/floor/update/:id",
  validateOwnerToken,
  updateFloorValidation,
  validateRequest,
  updateFloor
);

export default floorRouter;
