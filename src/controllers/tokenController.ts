import { User } from "../models/userSchema";
import { Request, Response } from "express";
import { generateAccessToken } from "../utils/jwt";
import jwt from "jsonwebtoken";
// Refresh token
export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token missing" });
  }

  let decoded;
  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { userId: string };
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Expired or invalid refresh token" });
  }

  const user = await User.findById(decoded.userId);
  if (!user || user.refreshToken !== refreshToken) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  const newAccessToken = generateAccessToken(user.id, user.role);

  return res.json({ accessToken: newAccessToken });
};
