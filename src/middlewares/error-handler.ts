import { ErrorRequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AUTH_COOKIE_NAME } from "../constants/auth.js";
import { CustomError } from "../errors/customErrors.js";

const { JsonWebTokenError } = jwt;

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error);

  if (error instanceof JsonWebTokenError) {
    return res
      .status(500)
      .clearCookie(AUTH_COOKIE_NAME)
      .json({ name: error.name, message: error.message, details: null });
  } else if (error instanceof CustomError) {
    const { status, ...rest } = error;

    return res.status(status).json(rest);
  } else {
    res.status(500).json({
      name: "GenericError",
      message: "Something went wrong. Please, contact our support.",
      details: null,
    });
  }
};
