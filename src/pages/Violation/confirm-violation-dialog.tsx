import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Ticket } from "lucide-react";

export default function ConfirmViolationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 text-xl cursor-pointer">
          <Ticket />
          Ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Penilangan</DialogTitle>
          <DialogDescription>Lakukan penilangan dengan menerbitkan Surat Tilang. Pastikan Anda masuk dengan akun yang sesuai.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col bg-zinc-200 outline-dashed outline-2 rounded p-2 px-4">
          <span>B8972KKK</span>
          <span>Sepeda Motor - Yamaha NMax - Merah</span>
          <span>Tidak Menggunakan Helm</span>
          <span className="mb-4">Jl. Telekomunikasi - Rabu, 24 Agustus 2023 13:30</span>
          <span className="font-semibold">Penyidik: Wahyudi - 2387293</span>
        </div>
        <DialogFooter>
          <Button type="submit">Konfirmasi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
