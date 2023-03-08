import { execute } from "../db/index.js";
import { authQueries } from "../queries/index.js";
export const createUser = async (user) => {
    const { rows } = await execute(authQueries.createUser, [
        user.email,
        user.password,
    ]);
    return rows[0].user_id;
};
export const getUserByEmail = async (email) => {
    const { rows } = await execute(authQueries.getUserByEmail, [email]);
    return rows[0];
};
