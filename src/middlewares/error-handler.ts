import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/customErrors.js";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error);

  const isCustomError = error instanceof CustomError;

  const clientError = isCustomError
    ? error
    : {
        message: "Something went wrong. Please, contact our support.",
        status: 500,
        error: null,
      };

  res.status(clientError.status).json(clientError);
};
