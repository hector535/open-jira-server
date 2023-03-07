import { config } from "dotenv";

//parse the content of the .env file and assagn it to process.env
config();

export default {
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
  origin: process.env.ORIGIN,
  dbConfig: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: +process.env.DB_PORT!,
  },
};
