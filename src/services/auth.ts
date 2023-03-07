import { execute } from "../db/index.js";
import { User } from "../types/index.js";
import * as queries from "../queries/auth.js";

export const createUser = async (user: User) => {
  const { rows } = await execute<{ user_id: number }>(queries.createUser, [
    user.email,
    user.password,
  ]);
  return rows[0].user_id;
};

export const getUserByEmail = async (email: string) => {
  const { rows } = await execute<User>(queries.getUserByEmail, [email]);
  return rows[0];
};
