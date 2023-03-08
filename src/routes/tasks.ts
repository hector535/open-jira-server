import { Router } from "express";
import { body } from "express-validator";
import { validateFields } from "../middlewares/index.js";
import { descriptionValidator, isValidStatusId } from "../validators/index.js";
import {
  getTaskById,
  getTasks,
  addTask,
  updateTaskById,
  deleteTaskById,
} from "../controllers/index.js";

const router = Router();

router.get("/", getTasks);
router.post("/", descriptionValidator, validateFields, addTask);
router.put(
  "/:id",
  descriptionValidator,
  body("status_id").toInt().custom(isValidStatusId),
  validateFields,
  updateTaskById
);
router.get("/:id", getTaskById);
router.delete("/:id", deleteTaskById);

export default router;
