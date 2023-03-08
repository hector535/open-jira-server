export const setCookie = (key, payload) => {
    const cookieOptions = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1 * 60 * 60 * 1000,
    };
    return [key, payload, cookieOptions];
};
