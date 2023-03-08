import { CookieOptions } from "express";

export const setCookie = (key: string, payload: unknown) => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1 * 60 * 60 * 1000,
  };

  return [key, payload, cookieOptions] as const;
};
