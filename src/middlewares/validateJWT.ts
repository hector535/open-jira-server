import { RequestHandler } from "express";
import { MissingTokenError } from "../errors/customErrors.js";
import { AuthRequest } from "../types/index.js";
import { verifyJWT } from "../utils/token.js";

export const validateJWT: RequestHandler = async (
  req: AuthRequest,
  res,
  next
) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new MissingTokenError();
    }

    const { userId } = (await verifyJWT(accessToken)) as { userId: number };

    req.userId = userId;

    next();
  } catch (error) {
    next(error);
  }
};
