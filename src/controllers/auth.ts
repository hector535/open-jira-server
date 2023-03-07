import { RequestHandler } from "express";
import bcrypt from "bcryptjs";

import { tryCatch } from "../errors/tryCatch.js";
import { AuthRequest, User } from "../types/index.js";
import { generateJWT } from "../utils/token.js";
import * as authService from "../services/auth.js";
import { BadUserInputError } from "../errors/customErrors.js";

export const createUser = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPwd = await bcrypt.hash(password, salt);

  const generatedUserId = await authService.createUser({
    email,
    password: hashedPwd,
  } as User);

  const token = await generateJWT({ userId: generatedUserId });

  res.cookie("accessToken", token, { httpOnly: true }).json({ email });
});

export const login = tryCatch(async (req: AuthRequest, res) => {
  const { email, password } = req.body;

  const user = await authService.getUserByEmail(email);

  if (!user) {
    throw new BadUserInputError("email/password invalid");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new BadUserInputError("email/password invalid");
  }

  const token = await generateJWT({ userId: user.user_id });

  res.cookie("accessToken", token, { httpOnly: true }).json({ email });
});

export const logout: RequestHandler = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .json();
};
