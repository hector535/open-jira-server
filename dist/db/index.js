import pkg from "pg";
import config from "../config/index.js";
const { Pool } = pkg;
let pool;
export const init = () => {
    pool = new Pool({ ...config.dbConfig, ssl: true });
    console.log("PostgresSQL Pool created successfully");
};
export const execute = (query, params = []) => {
    if (!pool)
        throw new Error("Pool was not created. Ensure the pool is created first by executing the init function.");
    return pool.query(query, params);
};
