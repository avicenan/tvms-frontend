import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CameraType } from "@/lib/types";
import { cameraApi } from "@/lib/api";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteDialog({ camera, onUpdate }: { camera: CameraType; onUpdate: () => void }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await cameraApi.deleteCamera(camera.id);
      setOpen(false);
      toast.success("Kamera berhasil dihapus", { description: camera.location });
      onUpdate();
    } catch (error) {
      toast.error("Kamera gagal dihapus");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Siaran</DialogTitle>
        </DialogHeader>
        <DialogDescription>Apakah anda yakin ingin menghapus siaran {camera.location} ini?</DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
