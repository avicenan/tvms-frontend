import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormItem, FormLabel, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPSlot, InputOTPGroup, InputOTPSeparator } from "@/components/ui/input-otp";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
const FormSchema = z.object({
  otp: z.string().min(6, { message: "Kode OTP harus 6 digit" }),
});

export default function Regist2FA({ qrCode }: { qrCode: string }) {
  const { loading, verify2FA } = useAuth();
  const [qrCodeImg] = useState(qrCode);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await verify2FA(data.otp);
  };
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Autentikasi Dua Faktor</CardTitle>
        <CardDescription>Pindai kode QR dengan aplikasi autentikator Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-white rounded-lg">{qrCodeImg && <img src={qrCodeImg} alt="2FA QR Code" className="w-60 h-60" />}</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 ">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode OTP</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                Verifikasi
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
