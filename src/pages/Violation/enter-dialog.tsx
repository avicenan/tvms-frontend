import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TimerUI from "@/components/ui/timer";

interface EnterDialogProps {
  open: boolean;
  onOpenChange: () => void;
}

export default function EnterDialog({ open, onOpenChange }: EnterDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenChange();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selesaikan proses sebelum waktu habis</DialogTitle>
          <DialogDescription>Proses validasi dibatasi oleh waktu, segera selesaikan proses sebelum waktu habis.</DialogDescription>
          <TimerUI time={600} />
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange()}>Mengerti</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
