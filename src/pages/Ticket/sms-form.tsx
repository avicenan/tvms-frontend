import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { CheckCircle2Icon, MailCheckIcon, Send } from "lucide-react";

export default function SMSForm() {
  const form = useForm({
    defaultValues: {
      to: "085176229987",
      body: `Kendaraan B3281KKK terdeteksi melanggar lalu lintas.

Nomor Tilang: hew7-323n-43u7     
Cek detail & instruksi di:
https://www.tilangelektronik.net?no=hew7-323n-43u7&vid=B3281KKK

Segera tindaklanjuti.
Korlantas Polri`,
    },
    onSubmit: (values) => console.log(values),
  });
  return (
    <div className="px-2">
      <div className="mb-2">
        <div className="font-semibold text-sm mb-2">Anda dapat mengirim SMS lagi pada Jumat, 28 </div>
        <div className="flex flex-col gap-2">
          <div className="flex-1 flex flex- gap-1">
            <MailCheckIcon className="mt-[2px]" />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">SMS</div>
              <div className="text-xs text-zinc-500">Kamis, 27 Agustus 2023</div>
            </div>
          </div>
        </div>
      </div>

      {/* <form
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
                <Label htmlFor="to">Nomor Hp</Label>
                <Input id="to" placeholder="085176229987" value={field.state.value} readOnly />
              </div>
            )}
          />
          <form.Field
            name="body"
            children={(field) => (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Pesan</Label>
                <Textarea id="body" placeholder="..." value={field.state.value} readOnly />
              </div>
            )}
          />
          <div className="flex justify-end">
            <Button>
              <Send /> Kirim
            </Button>
          </div>
        </div>
      </form> */}
    </div>
  );
}
