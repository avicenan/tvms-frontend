import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import TimerUI from "@/components/ui/timer";

interface TimeoutDialogProps {
  open: boolean;
  onExit: () => void;
  onRefreshSession: () => void;
}

export default function TimeoutDialog({ open, onExit, onRefreshSession }: TimeoutDialogProps) {
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (open) {
      const timer = setInterval(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [open, count]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sesi anda akan segera habis!</AlertDialogTitle>
          <AlertDialogDescription>Proses validasi dibatasi oleh waktu, perbarui sesi atau kembali ke menu pelanggaran.</AlertDialogDescription>
          <TimerUI time={10} className="text-red-600" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onExit}>Keluar</AlertDialogCancel>
          <AlertDialogAction onClick={onRefreshSession}>Perbarui Sesi</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
