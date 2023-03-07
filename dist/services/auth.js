import { execute } from "../db/index.js";
import * as queries from "../queries/auth.js";
export const createUser = async (user) => {
    const { rows } = await execute(queries.createUser, [
        user.email,
        user.password,
    ]);
    return rows[0].user_id;
};
export const getUserByEmail = async (email) => {
    const { rows } = await execute(queries.getUserByEmail, [email]);
    return rows[0];
};
