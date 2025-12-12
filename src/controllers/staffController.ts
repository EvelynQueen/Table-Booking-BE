import { Request, Response } from "express";
import { User } from "../models/userSchema";
import bcrypt from "bcrypt";
import {
  sendCreateStaffEmail,
  sendStaffVerificationEmail,
} from "../utils/sendEmail";
import { AuthRequest } from "../types/authRequest";

// Create Staff (only OWNER allowed)
export const createStaff = async (req: AuthRequest, res: Response) => {
  if (!req.user || !req.user.email) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  const { name, email, password, role, phoneNumber } = req.body;
  const ownerEmail = req.user?.email;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString();
    const verifyCreated = new Date();
    const verifyExpires = new Date(verifyCreated.getTime() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      verifyCode,
      verifyCreated,
      verifyExpires,
    });

    await sendStaffVerificationEmail(email, verifyCode);
    await sendCreateStaffEmail(ownerEmail, name, email, phoneNumber);
    return res.status(200).json({
      message: "Staff created successfully. Verification code sent.",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!" });
  }
};

// Delete Staff (OWNER only)
export const deleteStaff = async (req: AuthRequest, res: Response) => {
  const staffId = req.params.id;
  const ownerEmail = req.user?.email;
  try {
    const staff = await User.findById(staffId);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found!" });
    }
    if (staffId === req.user?.userId) {
      return res.status(403).json({ message: "You can't delete yourself!" });
    }

    await staff.deleteOne();
    await staff.sendDeleteStaffEmail(
      ownerEmail || "quyenneblog@gmail.com",
      staff.name,
      staff.email,
      staff.phoneNumber
    );
    return res.status(200).json({
      message: "Staff deleted successfully!",
      staff: {
        email: staff.email,
        role: staff.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error!" });
  }
};

// Get all staff
export const getAllUser = async (req: Request, res: Response) => {
  let roles: string[] = [];
  const roleQuery = req.query.role;

  try {
    if (!roleQuery) {
      return res.status(400).json({ message: "Role is required!" });
    }

    roles = Array.isArray(roleQuery)
      ? roleQuery.map(String)
      : [String(roleQuery)];

    const allowedRoles = ["owner", "staff", "customer"];
    const invalid = roles.filter((r) => !allowedRoles.includes(r));
    if (invalid.length > 0) {
      return res.status(400).json({ message: "Invalid Roles!" });
    }

    const userList = await User.find({ role: { $in: roles } });
    return res.status(200).json({
      message: "Get users by roles successfully!",
      roles,
      users: userList,
    });
  } catch (error) {
    return res.status(500).json({ message: "Can't get List User!" });
  }
};
