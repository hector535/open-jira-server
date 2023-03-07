import pkg, { QueryResultRow } from "pg";
import config from "../config/index.js";

const { Pool } = pkg;

let pool: pkg.Pool;

export const init = () => {
  pool = new Pool({ ...config.dbConfig, ssl: true });
  console.log("PostgresSQL Pool created successfully");
};

export const execute = <T extends QueryResultRow>(
  query: string,
  params: string[] | number[] = []
) => {
  if (!pool)
    throw new Error(
      "Pool was not created. Ensure the pool is created first by executing the init function."
    );

  return pool.query<T>(query, params);
};
