import bcrypt from "bcryptjs";
import { tryCatch, BadInputError } from "../errors/index.js";
import { generateJWT, setCookie } from "../utils/index.js";
import { authServices } from "../services/index.js";
import { AUTH_COOKIE_NAME, EMAIL_PASSWORD_INVALID_MESSAGE, EMAIL_EXISTS_MESSAGE, } from "../constants/index.js";
export const createUser = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.getUserByEmail(email);
    if (user) {
        throw new BadInputError(EMAIL_EXISTS_MESSAGE);
    }
    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);
    const generatedUserId = await authServices.createUser({
        email,
        password: hashedPwd,
    });
    const token = await generateJWT({ userId: generatedUserId });
    res.cookie(...setCookie(AUTH_COOKIE_NAME, token)).json({ email });
});
export const login = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.getUserByEmail(email);
    if (!user) {
        throw new BadInputError(EMAIL_PASSWORD_INVALID_MESSAGE);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new BadInputError(EMAIL_PASSWORD_INVALID_MESSAGE);
    }
    const token = await generateJWT({ userId: user.user_id });
    res.cookie(...setCookie(AUTH_COOKIE_NAME, token)).json({ email });
});
export const logout = (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME).json();
};
