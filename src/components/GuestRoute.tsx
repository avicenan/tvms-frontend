import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export default function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (user && !loading && location.pathname === "/login") {
    toast.error(`Selamat datang, ${user.name}`, {
      description: `Anda telah login sebelumnya.`,
    });
    return <Navigate to="/d/dashboard" />;
  }
  return <>{children}</>;
}
