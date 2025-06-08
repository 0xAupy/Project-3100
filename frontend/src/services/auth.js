import api from "./api";

/**
 * Register a new user
 * @param {{ name: string, email: string, password: string }} data
 */
export const register = (data) => api.post("/users/register", data);

/**
 * Log in an existing user
 * @param {{ email: string, password: string }} data
 */
export const login = (data) => api.post("/users/login", data);

/**
 * Log out the current user
 */
export const logout = () => api.get("/users/logout");

/**
 * Fetch the currently authenticated user
 */
export const getMe = () => api.get("/users/me");

/**
 * Send account-verification OTP to the user's email
 */
export const sendVerifyOtp = () => api.post("/users/send-verify-otp");

/**
 * Verify the user's email with the OTP they received
 * @param {{ otp: string }} data
 */
export const verifyEmail = (data) => api.post("/users/verify-account", data);

/**
 * Send password-reset OTP to the user's email
 */
export const sendResetOtp = () => api.post("/users/send-reset-otp");

/**
 * Reset the user's password using the OTP and new password
 * @param {{ otp: string, newPassword: string }} data
 */
export const resetPassword = (data) => api.post("/users/reset-password", data);
