import { TrafficCone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import Verify2FA from "@/pages/Auth/verify-2fa";
import Regist2FA from "./regist-2fa";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { login, register2FA, loading } = useAuth();
  const [show2FA, setShow2FA] = useState(false);
  const [reg2FA, setReg2FA] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const response = await login(values.email, values.password);
      if (response.is_2fa_enabled) {
        setShow2FA(true);
      } else {
        setShow2FA(false);
        get2FAQRCode();
      }
    } catch (error) {
      // Error is handled by the AuthContext
    }
  };

  const get2FAQRCode = async () => {
    try {
      const response = await register2FA();
      console.log("2FA Registration Response:", response);

      // Convert ArrayBuffer to base64
      const bytes = new Uint8Array(response as ArrayBuffer);
      const binary = bytes.reduce((data, byte) => data + String.fromCharCode(byte), "");
      const base64 = btoa(binary);
      const imageBase64 = `data:image/png;base64,${base64}`;

      setQrCode(imageBase64);
      setReg2FA(true);
    } catch (error) {
      console.error("Error registering 2FA:", error);
      // Error is handled by the AuthContext
    }
  };

  if (show2FA) {
    return <Verify2FA />;
  }

  if (reg2FA && qrCode) {
    return <Regist2FA qrCode={qrCode} />;
  }

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="bg-white rounded-lg border p-6 text-center">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a href="#" className="flex flex-col items-center gap-2 font-medium">
                <div className="flex size-8 items-center justify-center rounded-md">
                  <TrafficCone className="size-6" />
                </div>
                <span className="sr-only">Acme Inc.</span>
              </a>
              <h1 className="text-xl font-bold">Traffic Violation Management System</h1>
            </div>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kata Sandi</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                Masuk
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Dengan mengklik lanjutkan, Anda setuju dengan <a href="#">Ketentuan Layanan</a> dan <a href="#">Kebijakan Privasi</a> kami.
      </div>
    </div>
  );
}
