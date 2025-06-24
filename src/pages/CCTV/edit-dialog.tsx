import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { cameraApi } from "@/lib/api";
import { CameraType } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  location: z.string().min(1, "Lokasi harus diisi"),
  stream_url: z.string().url("URL stream tidak valid").min(1, "URL stream harus diisi"),
  stream_key: z.string().min(1, "Stream key harus diisi"),
  status: z.string().default("Aktif"),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditCameraDialog({ camera, onUpdate }: { camera: CameraType; onUpdate: () => void }) {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: camera.location,
      stream_url: camera.stream_url,
      stream_key: camera.stream_key,
      status: camera.status,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // await cameraApi.updateCamera(camera.id, {
      //   ...data,
      //   status: data.status,
      // });
      console.log(data);
      form.reset();
      setOpen(false);
      toast.success("Kamera berhasil diubah", { description: camera.location });
      onUpdate();
    } catch (error) {
      toast.error("Kamera gagal diubah");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Siaran</DialogTitle>
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
                      <SelectItem value="aktif">Aktif</SelectItem>
                      <SelectItem value="perbaikan">Perbaikan</SelectItem>
                      <SelectItem value="tidak aktif">Tidak Aktif</SelectItem>
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
