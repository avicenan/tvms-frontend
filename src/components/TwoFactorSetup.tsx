import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const TwoFactorSetup: React.FC = () => {
  const { setup2FA, verify2FASetup, user } = useAuth();
  const [qrCode, setQrCode] = useState<string>("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetup = async () => {
    try {
      setLoading(true);
      const response = await setup2FA();
      const url = URL.createObjectURL(response);
      setQrCode(url);
    } catch (error) {
      console.error("Failed to setup 2FA:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      await verify2FASetup(otp);
      setOtp("");
      setQrCode("");
    } catch (error) {
      console.error("Failed to verify 2FA:", error);
    } finally {
      setLoading(false);
    }
  };

  if (user?.two_factor_enabled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>2FA is already enabled for your account</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>Set up two-factor authentication to add an extra layer of security to your account</CardDescription>
      </CardHeader>
      <CardContent>
        {!qrCode ? (
          <Button onClick={handleSetup} disabled={loading}>
            {loading ? "Setting up..." : "Setup 2FA"}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
            </div>
            <div className="space-y-2">
              <Input type="text" placeholder="Enter OTP code" value={otp} onChange={(e) => setOtp(e.target.value)} disabled={loading} />
              <Button onClick={handleVerify} disabled={loading || !otp}>
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
