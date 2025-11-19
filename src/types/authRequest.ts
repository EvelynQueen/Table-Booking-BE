import { Request } from "express";
import { DecodedToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: DecodedToken;
}
