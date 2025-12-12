import { Table } from "../models/tableSchema";
import { AuthRequest } from "../types/authRequest";
import { Request, Response } from "express";
import { Floor } from "../models/floorSchema";
import { modTableMail } from "../utils/sendEmail";

// Create table controller
export const createTable = async (req: AuthRequest, res: Response) => {
  if (!req.user?.email) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const owner = req.user.email;
  const { code, floorId, seat, description } = req.body;

  try {
    const existFloor = await Floor.findById(floorId);
    if (!existFloor) {
      return res.status(400).json({ message: "Floor not found" });
    }

    const existTable = await Table.findOne({ code, floorId });
    if (existTable) {
      return res
        .status(400)
        .json({ message: "Table with this code already exists on this floor" });
      4;
    }

    const table = await Table.create({
      code,
      floorId,
      seat,
      description,
    });

    modTableMail(
      "Create",
      owner,
      code,
      existFloor.name,
      existFloor.floor,
      seat,
      table.status
    );

    return res.status(200).json({
      message: "Create new table successfully",
      table,
      existFloor,
    });
  } catch (error) {
    console.error("Error creating table:", error);
    return res.status(500).json({ message: "Failed to create new table!" });
  }
};

// Delete table controller
export const deleteTable = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const tableId = req.params.id;
    const owner = req.user.email;

    const existTable = await Table.findById(tableId);
    const existFloor = await Floor.findById(existTable?.floorId);

    if (!existTable) {
      return res.status(404).json({ message: "Table not found!" });
    }

    await existTable.deleteOne();

    // Send email after deletion
    await modTableMail(
      "Delete",
      owner,
      existTable.code,
      existFloor.name,
      existFloor.floor,
      existTable.seat,
      existTable.status
    );

    return res.status(200).json({
      message: "Delete table successfully!",
      deletedTable: existTable,
      existFloor,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all Table
export const getAllTable = async (_req: Request, res: Response) => {
  try {
    const tableList = await Table.find().populate("floorId");

    if (!tableList || tableList.length === 0) {
      return res
        .status(200)
        .json({ message: "Table list is empty!", tables: [] });
    }

    return res.status(200).json({
      message: "Get List Table successfully!",
      tables: tableList,
    });
  } catch (error) {
    return res.status(500).json({ message: "Can't get List Table!" });
  }
};
