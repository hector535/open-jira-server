import { tryCatch } from "../errors/index.js";
import { taskServices } from "../services/index.js";
export const getTasks = tryCatch(async (req, res) => {
    const data = await taskServices.getTasks({ userId: req.userId });
    res.json(data);
});
export const addTask = tryCatch(async (req, res) => {
    const { description } = req.body;
    const data = await taskServices.addTask({
        description,
        user_id: req.userId,
    });
    res.json(data);
});
export const updateTaskById = tryCatch(async (req, res) => {
    const { description, status_id } = req.body;
    const { id } = req.params;
    const data = await taskServices.updateTaskById({
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
    const data = await taskServices.getTaskById({
        userId: userId,
        taskId: +id,
    });
    res.json(data);
});
export const deleteTaskById = tryCatch(async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const data = await taskServices.deleteTaskById({
        userId: userId,
        taskId: +id,
    });
    res.json(data);
});
