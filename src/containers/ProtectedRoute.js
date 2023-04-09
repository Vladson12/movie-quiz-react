import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  if (!auth) {
    return <Navigate to="/" replace="true" />;
  }
  return children;
};
