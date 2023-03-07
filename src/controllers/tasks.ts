import { RequestHandler } from "express";
import { tryCatch } from "../errors/tryCatch.js";
import { AuthRequest, Task } from "../types/index.js";
import * as TaskService from "../services/tasks.js";

export const getTasks: RequestHandler = tryCatch(
  async (req: AuthRequest, res) => {
    const data = await TaskService.getTasks({ userId: req.userId! });
    res.json(data);
  }
);

export const addTask: RequestHandler = tryCatch(
  async (req: AuthRequest, res) => {
    const { description } = req.body;

    const data = await TaskService.addTask({
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

    const data = await TaskService.updateTaskById({
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

    const data = await TaskService.getTaskById({
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
    const data = await TaskService.deleteTaskById({
      userId: userId!,
      taskId: +id,
    });
    res.json(data);
  }
);
