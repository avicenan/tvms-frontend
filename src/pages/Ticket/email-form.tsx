import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Send } from "lucide-react";
import { useForm } from "@tanstack/react-form";

const sendEmail = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "oke";
};

export default function EmailForm() {
  const form = useForm({
    defaultValues: {
      to: "john@gmail",
      subject: "Tilang Elektronik - 923x-234d-sqe8",
      body: `Yth. Pemilik/Pengendara,

Kendaraan Anda dengan nomor B3281KKK terdeteksi melakukan pelanggaran lalu lintas.

📌 Nomor Tilang: hew7-323n-43u7
📌 Cek Detail & Instruksi: 
https://www.tilangelektronik.net?no=hew7-323n-43u7&vid=B3281KKK

Harap segera menindaklanjuti sesuai ketentuan yang berlaku. Jika ada pertanyaan, silakan hubungi kepolisian setempat.

Terima kasih.
Korlantas Polri`,
    },
    onSubmit: async ({ value }) => {
      await sendEmail();
      console.log(value);
    },
  });
  return (
    <div className="px-2">
      {/* <div className="">
        <div className="font-semibold text-sm">Anda dapat mengirim email lagi pada Jumat, 28 </div>
        <div className="flex-1 flex gap-1">
          <CheckCircle2Icon color="black" fill="blue" fillOpacity={0.5} className="mt-[2px]" />
          <div className="flex flex-col">
            <div className="font-semibold text-sm">Email</div>
            <div className="text-xs text-zinc-500">Kamis, 27 Agustus 2023</div>
          </div>
        </div>
      </div> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="grid w-full items-center gap-4">
          <form.Field
            name="to"
            children={(field) => (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="to">Tujuan</Label>
                <Input id="to" placeholder="john@gmail.com" value={field.state.value} readOnly />
              </div>
            )}
          />
          <form.Field
            name="subject"
            children={(field) => (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="subject">Subjek</Label>
                <Input id="subject" placeholder="Tilang Elektronik - 923x-234d-sqe8" value={field.state.value} readOnly />
              </div>
            )}
          />
          <form.Field
            name="body"
            children={(field) => (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="body">Pesan</Label>
                <Textarea id="body" placeholder="..." value={field.state.value} readOnly />
              </div>
            )}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex justify-end">
                <Button type="submit" onClick={form.handleSubmit} disabled={!canSubmit}>
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" /> Mengirim
                    </>
                  ) : (
                    <>
                      <Send /> Kirim
                    </>
                  )}
                </Button>
              </div>
            )}
          />
        </div>
      </form>
    </div>
  );
}
