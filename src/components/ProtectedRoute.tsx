import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FC } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // if (!user && !loading) {
  //   toast.error("Silakan masuk terlebih dahulu");
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  if (!Cookies.get("auth_token") && location.pathname === "/d") {
    toast.error("Silakan masuk terlebih dahulu");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (location.pathname === "/d/users") {
    if (user?.role !== "admin") {
      toast.error("Anda tidak memiliki akses ke halaman ini");
      return <Navigate to="/d/dashboard" replace />;
    }
  }
  return <>{children}</>;
};
