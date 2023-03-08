import jwt from "jsonwebtoken";
import config from "../config/index.js";
export const generateJWT = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, config.secretKey, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
};
export const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secretKey, (err, payload) => {
            if (err) {
                console.error(err);
                console.log({ ...err });
                reject(err);
            }
            else {
                resolve(payload);
            }
        });
    });
};
