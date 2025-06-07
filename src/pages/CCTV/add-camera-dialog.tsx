import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cameraApi } from "@/lib/api";
import { useState } from "react";

const formSchema = z.object({
  location: z.string().min(1, "Lokasi harus diisi"),
  stream_url: z.string().url("URL stream tidak valid").min(1, "URL stream harus diisi"),
  stream_key: z.string().min(1, "Stream key harus diisi"),
  status: z.enum(["Aktif", "Perbaikan", "Tidak Aktif"]).default("Aktif"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddCameraDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      stream_url: "",
      stream_key: "",
      status: "Aktif",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await cameraApi.createCamera({
        ...data,
        status: data.status,
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error creating camera:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Plus className="mr-2" /> Tambah Kamera
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Siaran</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan lokasi kamera" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stream_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Stream</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan URL stream" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stream_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stream Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan stream key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Kamera</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status kamera" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Aktif">Aktif</SelectItem>
                      <SelectItem value="Perbaikan">Perbaikan</SelectItem>
                      <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
