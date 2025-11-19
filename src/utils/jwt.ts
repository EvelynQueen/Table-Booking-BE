import jwt from "jsonwebtoken";

// Generate JWT Token
export const generateAccessToken = (userId: string, role: string) => {
  // Sign JWT => payload, secret, option
  return jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};

// Decode ACCESS Token
export interface DecodedToken {
  userId: string;
  role: string;
  [key: string]: any;
}

export const decodeToken = (token: string): DecodedToken => {
  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  if (!secret) throw new Error("JWT secret is not defined");

  return jwt.verify(token, secret) as DecodedToken;
};
