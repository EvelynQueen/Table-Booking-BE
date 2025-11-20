import { Response } from "express";
import { User } from "../models/userSchema";
import bcrypt from "bcrypt";
import { sendStaffVerificationEmail } from "../utils/sendEmail";
import { AuthRequest } from "../types/authRequest";

// Create Staff (only OWNER allowed)
export const createStaff = async (req: AuthRequest, res: Response) => {
  const { name, email, password, role, phoneNumber } = req.body;

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

  try {
    const staff = await User.findById(staffId);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found!" });
    }
    if (staffId === req.user?.userId) {
      return res.status(403).json({ message: "You can't delete yourself!" });
    }

    await staff.deleteOne();

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
