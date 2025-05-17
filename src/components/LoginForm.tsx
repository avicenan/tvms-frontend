import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const LoginForm: React.FC = () => {
  const { login, logout, verify2FA, register2FA, loading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [reg2FA, setReg2FA] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  console.log("INI USERNYA", user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log(response);
      if (response.is_2fa_enabled) {
        setShow2FA(true);
      } else {
        setShow2FA(false);
        handleRegister2FA();
      }
    } catch (error) {
      // Error is handled by the AuthContext
    }
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await logout();
      console.log(response);
    } catch (error) {
      // Error is handled by the AuthContext
    }
  };

  const handle2FAVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verify2FA(otp);
    } catch (error) {
      // Error is handled by the AuthContext
    }
  };

  const handleRegister2FA = async () => {
    try {
      const response = await register2FA();
      console.log("2FA Registration Response:", response);

      // Convert ArrayBuffer to base64
      const bytes = new Uint8Array(response);
      const binary = bytes.reduce((data, byte) => data + String.fromCharCode(byte), "");
      const base64 = btoa(binary);
      const imageBase64 = `data:image/png;base64,${base64}`;

      setQrCodeUrl(imageBase64);
      setReg2FA(true);
    } catch (error) {
      console.error("Error registering 2FA:", error);
      // Error is handled by the AuthContext
    }
  };

  if (show2FA) {
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <p>{user?.email}</p>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Enter the OTP code from your authenticator app</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handle2FAVerify} className="space-y-4">
            <div className="space-y-2">
              <Input type="text" placeholder="Enter OTP code" value={otp} onChange={(e) => setOtp(e.target.value)} disabled={loading} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (reg2FA) {
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Scan the QR code with your authenticator app</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-white rounded-lg">{qrCodeUrl && <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />}</div>
            <form onSubmit={handle2FAVerify} className="w-full space-y-4">
              <div className="space-y-2">
                <Input type="text" placeholder="Enter OTP code" value={otp} onChange={(e) => setOtp(e.target.value)} disabled={loading} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required />
          </div>
          <div className="space-y-2">
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <form onSubmit={handleLogout} className="mt-4">
          <Button type="submit" variant="outline" className="w-full">
            Logout
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
