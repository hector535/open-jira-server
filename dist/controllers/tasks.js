import { tryCatch } from "../errors/tryCatch.js";
import * as TaskService from "../services/tasks.js";
export const getTasks = tryCatch(async (req, res) => {
    const data = await TaskService.getTasks({ userId: req.userId });
    res.json(data);
});
export const addTask = tryCatch(async (req, res) => {
    const { description } = req.body;
    const data = await TaskService.addTask({
        description,
        user_id: req.userId,
    });
    res.json(data);
});
export const updateTaskById = tryCatch(async (req, res) => {
    const { description, status_id } = req.body;
    const { id } = req.params;
    const data = await TaskService.updateTaskById({
        task_id: +id,
        user_id: req.userId,
        description,
        status_id,
    });
    res.json(data);
});
export const getTaskById = tryCatch(async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const data = await TaskService.getTaskById({
        userId: userId,
        taskId: +id,
    });
    res.json(data);
});
export const deleteTaskById = tryCatch(async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const data = await TaskService.deleteTaskById({
        userId: userId,
        taskId: +id,
    });
    res.json(data);
});
