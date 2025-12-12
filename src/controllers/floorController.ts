import { Request, Response } from "express";
import { Floor } from "../models/floorSchema";
import { AuthRequest } from "../types/authRequest";
import { Table } from "../models/tableSchema";
import { modFloorMail } from "../utils/sendEmail";

export const createFloor = async (req: AuthRequest, res: Response) => {
  if (!req.user || !req.user.email) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const { floor, name, description } = req.body;

  try {
    const newFloor = await Floor.create({
      floor: floor,
      name: name,
      description: description,
    });

    return res.status(201).json({
      message: "New Floor create successfully!",
      Floor: {
        floorId: newFloor._id,
        floor: newFloor.floor,
        name: newFloor.name,
        status: newFloor.status,
        description: newFloor.description,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create floor!" });
  }
};

export const deleteFloor = async (req: AuthRequest, res: Response) => {
  if (!req.user || !req.user.email) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  const owner = req.user.email;
  const floorId = req.params.id;
  try {
    const hasTable = await Table.exists({ floorId });
    if (hasTable) {
      return res.status(400).json({
        message:
          "Please delete all tables in this floor before delete this floor!",
      });
    }

    const floor = await Floor.findById(floorId);

    if (!floor) {
      return res.status(404).json({ message: "Floor not found !" });
    }

    await floor.deleteOne();

    await modFloorMail("Deleted", owner, floor.floor, floor.name, floor.status);
    return res.status(200).json({
      floor: floor.floor,
      name: floor.name,
      description: floor.description,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete floor!" });
  }
};

export const updateFloor = async (req: AuthRequest, res: Response) => {
  if (!req.user || !req.user.email) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  const owner = req.user.email;
  const floorId = req.params.id;
  const { floor, name, status, description } = req.body;
  const existingFloor = await Floor.findById(floorId);
  try {
    if (!existingFloor) {
      return res.status(404).json({ message: "Floor not found !" });
    }

    if (floor !== undefined || existingFloor.floor !== floor)
      existingFloor.floor = floor;
    if (name !== undefined || existingFloor.name !== name)
      existingFloor.name = name;
    if (status !== undefined || existingFloor.status !== existingFloor)
      existingFloor.status = status;
    if (description !== undefined || existingFloor.description !== description)
      existingFloor.description = description;

    await existingFloor.save();
    await modFloorMail(
      "Deleted",
      owner,
      existingFloor.floor,
      existingFloor.name,
      existingFloor.status
    );
    return res.status(200).json({
      message: "Floor updated successfully",
      floor: {
        floorId: existingFloor._id,
        floor: existingFloor.floor,
        name: existingFloor.name,
        status: existingFloor.status,
        description: existingFloor.description,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update floor" });
  }
};

export const getAllFloor = async (_req: Request, res: Response) => {
  try {
    const floorList = await Floor.find();

    if (!floorList || floorList.length === 0) {
      return res
        .status(200)
        .json({ message: "Floor list is empty!", floors: [] });
    }

    return res.status(200).json({
      message: "Get List Floor successfully!",
      floors: floorList,
    });
  } catch (error) {
    return res.status(500).json({ message: "Can't get List Floor!" });
  }
};
