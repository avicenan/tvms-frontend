import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const userData = JSON.parse(Cookies.get("user") || "{}");
  if (userData || user) {
    //   return <Navigate to="/" />;
    return children;
  }
  return children;
}
