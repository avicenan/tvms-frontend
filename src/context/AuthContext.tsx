import { createContext, useContext, useState, ReactNode, FC } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { authApi } from "../lib/api";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  nip: string;
  role: string;
  is_2fa_enabled: boolean;
}

interface LoginResponse {
  message: string;
  token: string;
  is_2fa_enabled: boolean;
}

interface Verify2FAResponse {
  user: User;
  token: string;
  is_2fa_verified: boolean;
}

// interface Register2FAResponse {
//   qr_code?: ArrayBuffer | Array<number>;
//   message?: string;
// }

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register2FA: () => Promise<ArrayBuffer | Array<number>>;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
  verify2FA: (otp: string) => Promise<Verify2FAResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  // const checkAuth = async () => {
  //   try {
  //     const token = Cookies.get("auth_token");
  //     // if (token) {
  //     //   const response = await authApi.getProfile();
  //     //   setUser(response.data);
  //     // }
  //   } catch (error) {
  //     console.error("Auth check failed:", error);
  //     Cookies.remove("auth_token");
  //     Cookies.remove("refresh_token");
  //     setUser(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authApi.login({ email, password });
      const { token } = response.data;

      // Store temporary token
      Cookies.set("auth_token", token);

      return response.data;
    } catch (error: any) {
      // Clean up temp token on error
      Cookies.remove("auth_token");
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verify2FA = async (otp: string) => {
    try {
      setLoading(true);
      const response = await authApi.verify2FA(otp);
      const { token, user } = response.data;
      Cookies.set("auth_token", token);
      Cookies.set("user", JSON.stringify(user));
      setUser(user);
      toast.success("Verifikasi 2FA Berhasil", {
        description: `Selamat datang, ${user.name}.`,
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verifikasi 2FA Gagal");
      throw error;
    } finally {
      setLoading(false);
      navigate("/d/dashboard");
    }
  };

  const register2FA = async () => {
    try {
      setLoading(true);
      const response = await authApi.register2FA();
      const { message } = response.data;
      toast.success(message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "2FA registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await authApi.logout();
      toast.success(response.data.message || "Berhasil keluar dari akun");
      return response.data;
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast.error(error.response?.data?.message || "Gagal keluar dari akun");
      throw error;
    } finally {
      setLoading(false);
      Cookies.remove("auth_token");
      Cookies.remove("user");
      Cookies.remove("validation_token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        verify2FA,
        register2FA,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
