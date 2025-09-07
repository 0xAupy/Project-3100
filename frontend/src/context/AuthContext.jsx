/* eslint-disable react-refresh/only-export-components */
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
    apiGetMe()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const register = (data) => apiRegister(data);

  const login = async (data) => {
    const res = await apiLogin(data);
    if (res.data?.user) {
      setUser(res.data.user);
    }
    return res;
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const sendVerifyOtp = () => apiSendVerifyOtp();

  const verifyEmail = (data) => apiVerifyEmail(data);

  const sendResetOtp = (email) => apiSendResetOtp({ email });

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
