import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { BadInputError } from "../errors/customErrors.js";

export const validateFields: RequestHandler = (req, res, next) => {
  const errors = validationResult(req).array({ onlyFirstError: true });

  if (errors.length > 0) {
    next(new BadInputError(errors));
    return;
  }

  next();
};
