import { CookieOptions } from "express";

export const setCookie = (key: string, payload: unknown) => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  return [key, payload, cookieOptions] as const;
};
