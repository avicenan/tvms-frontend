import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CircleX } from "lucide-react";
import { CancelViolationForm } from "./cancel-violation-form";

export default function CancelViolationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex-1 text-xl cursor-pointer">
          <CircleX />
          Batalkan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pembatalan</DialogTitle>
          <DialogDescription>Buat keputusan pembatalan. Pastikan Anda masuk dengan akun yang sesuai.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col bg-zinc-200 outline-dashed outline-2 rounded p-2 px-4">
          <span>B8972KKK</span>
          <span>Sepeda Motor - Yamaha NMax - Merah</span>
          <span>Tidak Menggunakan Helm</span>
          <span className="mb-4">Jl. Telekomunikasi - Rabu, 24 Agustus 2023 13:30</span>
          <span className="font-semibold">Petugas: Wahyudi - 2387293</span>
        </div>
        <div className="">
          <CancelViolationForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
