import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTicket } from "@/context/CheckTicketContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  ticket_no: z.string().min(1, "Nomor tilang harus diisi"),
  vehicle_no: z.string().min(1, "Nomor kendaraan harus diisi"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CheckTicketForm() {
  const { getTicket } = useTicket();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticket_no: "",
      vehicle_no: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    getTicket(data.ticket_no, data.vehicle_no);
  };

  return (
    <Card className="bg-white lg:p-8 p-4 rounded-xl w-full lg:w-200 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="ticket_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Nomor Tilang</FormLabel>
                <FormControl>
                  <Input placeholder="hh5s-323n-43u7" {...field} onChange={(e) => field.onChange(e.target.value.toLowerCase())} disabled={form.formState.isSubmitting} />
                </FormControl>
                {/* <div className="text-xl text-start font-bold uppercase">{field.value}</div> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vehicle_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Nomor Kendaraan</FormLabel>
                <FormControl>
                  <Input placeholder="B5623KKK" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} disabled={form.formState.isSubmitting} />
                </FormControl>
                {/* <div className="text-xl text-start font-bold uppercase">{field.value}</div> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full mt-8 cursor-pointer">
            {form.formState.isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin" />
                <span className="ml-2">Memuat...</span>
              </div>
            ) : (
              "Cek Status Tilang"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
