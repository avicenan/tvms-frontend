import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRef, useState } from "react";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { validationApi } from "@/lib/validationApi";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  type: z.enum(["bukan_pelanggaran", "identitas_salah", "lainnya"], {
    required_error: "Berikan setidaknya satu keterangan.",
  }),
  cancel_description: z.string().optional(),
});

export function CancelViolationForm() {
  const violationId = useRef<string>(Cookies.get("active_violation_id") || "");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const response = await validationApi.cancelViolation(violationId.current, { cancel_description: data.cancel_description ? data.cancel_description : data.type });
      navigate("/d/violations");
      toast.success(response.data.violation.status, {
        description: `Pelanggaran kendaraan ${response.data.violation.number} berhasil dibatalkan`,
      });
    } catch (error: any) {
      toast.error("Gagal membatalkan pelanggaran", {
        description: error?.response?.data?.message || error.message || "Terjadi kesalahan",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 bg-white p-4 border border-gray-200 rounded-lg">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Bukan pelanggaran karena:</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="bukan_pelanggaran" />
                    </FormControl>
                    <FormLabel className="font-normal">Tidak melakukan pelanggaran</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="identitas_salah" />
                    </FormControl>
                    <FormLabel className="font-normal">Identitas salah</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="lainnya" />
                    </FormControl>
                    <FormLabel className="font-normal">Lainnya</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("type") === "lainnya" && (
          <FormField
            control={form.control}
            name="cancel_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keterangan</FormLabel>
                <FormControl>
                  <Input defaultValue={field.value} type="text" placeholder="Ketikkan keterangan" className="mt-2" />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            Konfirmasi
          </Button>
        </div>
      </form>
    </Form>
  );
}
