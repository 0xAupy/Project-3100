import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  // if user is not logged in, redirect to login page. replace ensures that user cannot go back to the protected page using back button
  return user ? children : <Navigate to="/login" replace />;
}
