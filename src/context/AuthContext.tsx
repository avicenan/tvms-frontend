import { createContext, useContext, useState, ReactNode, FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    if (!Cookies.get("auth_token") && location.pathname === "/d") {
      navigate("/login");
    }
    const checkAuth = async () => {
      try {
        const token = Cookies.get("auth_token");
        if (token) {
          const response = await authApi.getProfile();
          setUser(response.data.user);
          return response.data.user;
        }
      } catch (error) {
        Cookies.remove("auth_token");
        setUser(null);
        navigate("/login");
        toast.error("Sesi habis, silahkan login kembali");
        throw error;
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

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
      toast.success("Verifikasi 2FA Berhasil", {
        description: `Selamat datang, ${user.name}.`,
      });
      setUser(user);
      navigate("/d/dashboard");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verifikasi 2FA Gagal");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register2FA = async () => {
    try {
      setLoading(true);
      const response = await authApi.register2FA();
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
      navigate("/login");
      const response = await authApi.logout();
      setUser(null);
      Cookies.remove("auth_token");
      Cookies.remove("validation_token");
      toast.success("Berhasil keluar dari akun", {
        description: response.data.message,
      });
      return response.data;
    } catch (error: any) {
      toast.error("Gagal keluar dari akun", {
        description: error.response?.data?.message,
      });
      throw error;
    } finally {
      setLoading(false);
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
