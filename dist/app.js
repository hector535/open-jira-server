import express from "express";
import cors from "cors";
import config from "./config/index.js";
import { tryCatch } from "./errors/tryCatch.js";
import { errorHandler } from "./middlewares/index.js";
export default class {
    constructor() {
        this.app = express();
        this.port = config.port;
        this.paths = {};
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }
    routes() {
        this.app.get("/test", tryCatch((req, res) => {
            res.json("Todo fue un exito");
        }));
        this.app.use(errorHandler);
    }
    listen() {
        this.app.listen(3000, () => {
            console.log(`Listening to the port: ${this.port}`);
        });
    }
}
