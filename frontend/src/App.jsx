import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import NewReport from "./pages/NewReport";
import ReportDetail from "./pages/ReportDetail";
import PrivateRoute from "./components/PrivateRoute";
import SafetyTips from "./pages/SafetyTips";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* public */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* protected */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports/new"
            element={
              <PrivateRoute>
                <NewReport />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports/:id"
            element={
              <PrivateRoute>
                <ReportDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/safety-tips"
            element={
              <PrivateRoute>
                <SafetyTips />
              </PrivateRoute>
            }
          />

          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />

          {/* fallback */}
          <Route
            path="*"
            element={
              <AuthContext.Consumer>
                {({ user }) =>
                  user ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              </AuthContext.Consumer>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
