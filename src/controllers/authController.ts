import { User } from "../models/userSchema";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../utils/sendEmail";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

// Register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString();
    const verifyCreated = new Date();
    const verifyExpires = new Date(verifyCreated.getTime() + 10 * 60 * 1000);
    // 10 minutes
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verifyCode,
      verifyCreated,
      verifyExpires,
    });

    await sendVerificationEmail(email, verifyCode);

    return res.status(200).json({
      message: "User registered successfully. Verification code sent to email.",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Verify mail via OTP
export const verifyMail = async (req: Request, res: Response) => {
  const { email, verifyCode } = req.body;

  try {
    const user = await User.findOne({ email }); // lookup by userId
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    if (!user.verifyCode) {
      return res.status(400).json({ message: "No verification code found." });
    }

    if (user.verifyExpires && user.verifyExpires < new Date()) {
      return res.status(400).json({ message: "Verification code expired." });
    }

    if (verifyCode !== user.verifyCode) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    user.verified = true;
    user.verifyCode = undefined;
    user.verifyCreated = undefined;
    user.verifyExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Resend Verification code
// Resend Verification code
export const resendVerificationCode = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }

  if (user.verified) {
    return res.status(409).json({ message: "Email is already verified!" });
  }

  const oneMinuteAgo = new Date(Date.now() - 60_000);
  if (user.verifyCreated && user.verifyCreated > oneMinuteAgo) {
    return res.status(429).json({ message: "Request too frequently" });
  }

  try {
    const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString();
    const verifyCreated = new Date();
    const verifyExpires = new Date(verifyCreated.getTime() + 10 * 60 * 1000);

    await sendVerificationEmail(email, verifyCode);
    user.verifyCode = verifyCode;
    user.verifyCreated = verifyCreated;
    user.verifyExpires = verifyExpires;
    await user.save();
    return res
      .status(200)
      .json({ message: "Verification code resent successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Login + grant tokens
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user is existed
  // Get the user by email including the password field
  // Because password - select = false => user.password = undefined without +password
  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ message: "Invalid email or password" });

  if (!user.verified)
    return res.status(401).json({ message: "Email not verified" });

  // Issue tokens
  const accessToken = generateAccessToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString());

  // Save rf to DB
  user.refreshToken = refreshToken;
  await user.save();

  return res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    accessToken,
  });
};

// Forgot password send mail
