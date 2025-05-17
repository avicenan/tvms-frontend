import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CircleX } from "lucide-react";
import { CancelViolationForm } from "./cancel-violation-form";
import { ViolationType } from "./Page";
import { useAuth } from "@/context/AuthContext";
interface CancelViolationDialogProps {
  violation: ViolationType;
}

export default function CancelViolationDialog({ violation }: CancelViolationDialogProps) {
  const { user } = useAuth();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="flex-1 text-2xl cursor-pointer bg-foreground text-background hover:bg-foreground/80  ">
          <CircleX />
          Batalkan
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader className="bg-red-500 p-2 rounded-lg text-white">
          <DialogTitle>Pembatalan</DialogTitle>
          <DialogDescription className="text-white">Buat keputusan pembatalan. Pastikan Anda masuk dengan akun yang sesuai.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col bg-zinc-100 rounded-lg p-4 space-y-3 outline-dashed outline-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <div className="text-sm font-medium text-zinc-500">Nomor Kendaraan</div>
              <div className="text-base font-semibold">{violation.number}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-zinc-500">Jenis Kendaraan</div>
              <div className="text-base font-semibold">
                {violation.vehicle_data.category} - {violation.vehicle_data.brand} {violation.vehicle_data.type} - {violation.vehicle_data.color}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-zinc-500">Jenis Pelanggaran</div>
            <div className="text-base font-semibold">{violation.violation_type.name}</div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-zinc-500">Regulasi</div>
            <div className="text-base line-clamp-1">{violation.violation_type.regulation}</div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-zinc-500">Deskripsi</div>
            <div className="text-base line-clamp-2">{violation.violation_type.description}</div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium text-zinc-500">Lokasi & Waktu</div>
            <div className="text-base">
              {violation.camera.location} -{" "}
              {new Date(violation.created_at).toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-200">
            <div className="text-sm font-medium text-zinc-500">Penindak</div>
            <div className="text-base font-semibold">
              {user?.name} - {user?.email}
            </div>
          </div>
        </div>
        <div className="">
          <CancelViolationForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
