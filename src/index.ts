import { fileURLToPath } from "url";
import { dirname, join } from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { taskRouter, authRouter } from "./routes/index.js";
import { errorHandler, validateJWT } from "./middlewares/index.js";
import config from "./config/index.js";
import * as db from "./db/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

db.init();

app.use(cors({ origin: config.origin, credentials: true }));
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));
app.use(cookieParser());

app.use("/api/tasks", validateJWT, taskRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening to port ${config.port}`);
});
