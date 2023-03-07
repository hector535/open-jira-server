export const createUser = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id;`;
export const getUserByEmail = `
SELECT 
	user_id,
	email,
	password
FROM users 
WHERE email = $1
`;
