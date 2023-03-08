import { RequestHandler } from "express";
import { tryCatch } from "../errors/index.js";
import { AuthRequest, Task } from "../types/index.js";
import { taskServices } from "../services/index.js";

export const getTasks: RequestHandler = tryCatch(
  async (req: AuthRequest, res) => {
    const data = await taskServices.getTasks({ userId: req.userId! });
    res.json(data);
  }
);

export const addTask: RequestHandler = tryCatch(
  async (req: AuthRequest, res) => {
    const { description } = req.body;

    const data = await taskServices.addTask({
      description,
      user_id: req.userId!,
    } as Task);
    res.json(data);
  }
);

export const updateTaskById: RequestHandler = tryCatch(
  async (req: AuthRequest, res) => {
    const { description, status_id } = req.body;
    const { id } = req.params;

    const data = await taskServices.updateTaskById({
      task_id: +id,
      user_id: req.userId!,
      description,
      status_id,
    } as Task);
    res.json(data);
  }
);

export const getTaskById: RequestHandler = tryCatch(
  async (req: AuthRequest, res) => {
    const { id } = req.params;
    const { userId } = req;

    const data = await taskServices.getTaskById({
      userId: userId!,
      taskId: +id,
    });
    res.json(data);
  }
);

export const deleteTaskById: RequestHandler = tryCatch(
  async (req: AuthRequest, res) => {
    const { id } = req.params;
    const { userId } = req;
    const data = await taskServices.deleteTaskById({
      userId: userId!,
      taskId: +id,
    });
    res.json(data);
  }
);
