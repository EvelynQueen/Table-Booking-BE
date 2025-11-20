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

    return res.status(200).json({
      message: "New Floor create successfully!",
      Floor: {
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
