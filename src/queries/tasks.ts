export const getTasks = `
SELECT 
	task_id,
	description,
	status_id,
	created_at
FROM tasks
WHERE user_id = $1
`;

export const getTaskById = `
SELECT 
	task_id,
	description,
	status_id,
	created_at
FROM tasks
WHERE user_id = $1
AND task_id = $2
`;

export const deleteTaskById = `DELETE FROM tasks WHERE task_id = $1 AND user_id = $2`;
