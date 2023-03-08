import { execute } from "../db/index.js";
import { Task } from "../types/index.js";
import { createUpdateByIdQuery, createInsertQuery } from "../utils/index.js";
import { taskQueries } from "../queries/index.js";

type UserAndTaskID = {
  userId: number;
  taskId: number;
};

export const getTasks = async ({ userId }: { userId: number }) => {
  const { rows } = await execute<Task>(taskQueries.getTasks, [userId]);
  return rows;
};

export const addTask = async (task: Task) => {
  const { query, values } = createInsertQuery({
    tableName: "tasks",
    idColumnName: "task_id",
    entity: task,
  });

  const { rows } = await execute<{ id: number }>(query, values);
  return rows[0].id;
};

export const getTaskById = async ({ userId, taskId }: UserAndTaskID) => {
  const { rows } = await execute<Task>(taskQueries.getTaskById, [
    userId,
    taskId,
  ]);
  return rows.length ? rows[0] : null;
};

export const deleteTaskById = async ({ userId, taskId }: UserAndTaskID) => {
  const { rowCount } = await execute<Task>(taskQueries.deleteTaskById, [
    taskId,
    userId,
  ]);
  return { affectedRows: rowCount };
};

export const updateTaskById = async (task: Task) => {
  const configObj = {
    tableName: "tasks",
    entity: task,
    idColumn: { name: "task_id", value: task.task_id },
  };

  const { query, values } = createUpdateByIdQuery(configObj);
  const { rowCount } = await execute(query, values);
  return { affectedRows: rowCount };
};
