import { body } from "express-validator";
export const descriptionValidator = body("description", "Must be between 5 - 500 chars long")
    .trim()
    .escape()
    .isLength({ min: 5, max: 500 });
export const isValidStatusId = (value) => {
    if (value < 1 || value > 3) {
        throw new Error("Must be a value between 1 - 3");
    }
    return true;
};
