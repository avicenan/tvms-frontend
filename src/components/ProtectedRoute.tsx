import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import { FC } from "react";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  if (!Cookies.get("auth_token")) {
    // Redirect to login page but save the attempted url
    toast.error("Silakan masuk terlebih dahulu");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
