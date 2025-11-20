import { Request, Response } from "express";
import { Floor } from "../models/floorSchema";

export const createFloor = async (req: Request, res: Response) => {
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

export const deleteFloor = async (req: Request, res: Response) => {
  const floorId = req.params.id;
  try {
    const floor = await Floor.findById(floorId);

    if (!floor) {
      return res.status(404).json({ message: "Floor not found !" });
    }

    await floor.deleteOne();

    return res.status(200).json({
      floor: floor.floor,
      name: floor.name,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete floor!" });
  }
};

export const updateFloor = async (req: Request, res: Response) => {
  const floorId = req.params.id;
  const { floor, name, status, description } = req.body;
  const existingFloor = await Floor.findById(floorId);
  try {
    if (!existingFloor) {
      return res.status(404).json({ message: "Floor not found !" });
    }

    if (floor !== undefined) existingFloor.floor = floor;
    if (name !== undefined) existingFloor.name = name;
    if (status !== undefined) existingFloor.status = status;
    if (description !== undefined) existingFloor.description = description;

    await existingFloor.save();
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
