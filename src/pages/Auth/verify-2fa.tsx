import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { InputOTP, InputOTPSeparator, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const FormSchema = z.object({
  otp: z.string().min(6, { message: "Kode OTP harus 6 digit" }),
});

export default function Verify2FA() {
  const { user, loading, verify2FA } = useAuth();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await verify2FA(data.otp);
  };

  return (
    <Card className="">
      <CardHeader>
        <p>{user?.email}</p>
        <CardTitle>Autentikasi Dua Faktor</CardTitle>
        <CardDescription>Masukkan kode OTP dari aplikasi autentikator Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <div className="flex justify-center items-center w-full gap-1 py-3">
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
                      </div>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              Verifikasi
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
