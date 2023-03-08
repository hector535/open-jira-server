import { MissingTokenError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/token.js";
export const validateJWT = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            throw new MissingTokenError();
        }
        const { userId } = (await verifyJWT(accessToken));
        req.userId = userId;
        next();
    }
    catch (error) {
        next(error);
    }
};
