export const setCookie = (key, payload) => {
    const cookieOptions = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    };
    return [key, payload, cookieOptions];
};
