import { execute } from "../db/index.js";
import { createUpdateByIdQuery, createInsertQuery } from "../utils/index.js";
import { taskQueries } from "../queries/index.js";
export const getTasks = async ({ userId }) => {
    const { rows } = await execute(taskQueries.getTasks, [userId]);
    return rows;
};
export const addTask = async (task) => {
    const { query, values } = createInsertQuery({
        tableName: "tasks",
        idColumnName: "task_id",
        entity: task,
    });
    const { rows } = await execute(query, values);
    return rows[0].id;
};
export const getTaskById = async ({ userId, taskId }) => {
    const { rows } = await execute(taskQueries.getTaskById, [
        userId,
        taskId,
    ]);
    return rows.length ? rows[0] : null;
};
export const deleteTaskById = async ({ userId, taskId }) => {
    const { rowCount } = await execute(taskQueries.deleteTaskById, [
        taskId,
        userId,
    ]);
    return { affectedRows: rowCount };
};
export const updateTaskById = async (task) => {
    const configObj = {
        tableName: "tasks",
        entity: task,
        idColumn: { name: "task_id", value: task.task_id },
    };
    const { query, values } = createUpdateByIdQuery(configObj);
    const { rowCount } = await execute(query, values);
    return { affectedRows: rowCount };
};
