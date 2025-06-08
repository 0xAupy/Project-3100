// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import {
  register as apiRegister,
  login as apiLogin,
  logout as apiLogout,
  getMe as apiGetMe,
  sendVerifyOtp as apiSendVerifyOtp,
  verifyEmail as apiVerifyEmail,
  sendResetOtp as apiSendResetOtp,
  resetPassword as apiResetPassword,
} from "../services/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, fetch current auth user
    apiGetMe()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  /** Wraps registration API */
  const register = (data) => apiRegister(data);

  /** Wraps login API and updates context */
  const login = async (data) => {
    const res = await apiLogin(data);
    if (res.data?.user) {
      setUser(res.data.user);
    }
    return res;
  };

  /** Wraps logout API and clears context */
  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  /** Send email verification OTP */
  const sendVerifyOtp = () => apiSendVerifyOtp();

  /** Verify email with OTP */
  const verifyEmail = (data) => apiVerifyEmail(data);

  /** Send password reset OTP */
  const sendResetOtp = () => apiSendResetOtp();

  /** Reset password with OTP */
  const resetPassword = (data) => apiResetPassword(data);

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    sendVerifyOtp,
    verifyEmail,
    sendResetOtp,
    resetPassword,
  };

  // Show a loading state until we know auth status
  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
