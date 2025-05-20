import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { publicApi } from "@/lib/publicApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useTicket } from "@/context/CheckTicketContext";

const formSchema = z.object({
  image: z.instanceof(File).nullable(),
  note: z.string().min(1, "Penjelasan harus diisi"),
});

type FormValues = z.infer<typeof formSchema>;

export default function UploadAppealDialog({ ticketId, open, setOpen, disabled }: { ticketId: string; open: boolean; setOpen: (open: boolean) => void; disabled: boolean }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
      note: "",
    },
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    form.setValue("image", file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        setPreviewUrl(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    form.setValue("image", null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const { reFetchTicket } = useTicket();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await publicApi.uploadAppeal(ticketId, data.image!, data.note);
      reFetchTicket();
      setOpen(false);
      toast.success("Bantahan berhasil dikirim", {
        description: "Bantahan Anda akan diproses oleh petugas",
      });
    } catch (error: any) {
      setOpen(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full cursor-pointer" disabled={disabled}>
          Unggah Bukti
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unggah Bukti</DialogTitle>
          <DialogDescription>Unggah bukti untuk bantahan surat tilang</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className={`border-2 border-dashed rounded-lg p-4 text-center ${isDragging ? "border-primary bg-primary/10" : "border-gray-300"}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              {previewUrl ? (
                <div className="flex flex-col items-center gap-2 relative">
                  <img src={previewUrl} alt="Uploaded" className="max-h-72" />
                  <Button variant="ghost" size="sm" onClick={handleRemoveImage} className="absolute bottom-0 right-0 text-red-300 font-medium hover:text-red-600 cursor-pointer">
                    Hapus
                  </Button>
                </div>
              ) : (
                <div className="cursor-pointer min-h-50 flex items-center justify-center" onClick={() => fileInputRef.current?.click()}>
                  <p className="text-sm text-gray-500">Seret dan lepas gambar di sini, atau klik untuk memilih</p>
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Penjelasan</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tambahkan catatan atau penjelasan untuk bantahan Anda..." className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="cursor-pointer">
                Kirim
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
