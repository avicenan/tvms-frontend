import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createTransaction } from "@/lib/paymentApi";
import { useState } from "react";
import MidtransPayment from "./midtransSnap";
import { TicketType } from "@/lib/types";
import { toast } from "sonner";

export default function paymentDialog({ ticket, disabled }: { ticket: TicketType; disabled: boolean }) {
  const [snapToken, setSnapToken] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreateTransaction = async () => {
    try {
      const response = await createTransaction({ ticket_id: ticket.id, type: "denda" });
      setSnapToken(response.snap_token.token);
    } catch (error: any) {
      toast.error("Gagal membuat transaksi", {
        description: error.response.data.message || error.response.data.error,
      });
      setOpen(false);
      console.error("Failed to create transaction:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer" onClick={() => handleCreateTransaction()} disabled={disabled}>
          Bayar Sekarang
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Bayar Denda</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Denda</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">Rp {ticket?.violation?.violation_type?.max_fine?.toLocaleString("id-ID")}</div>
            </div>
            <div className="h-12 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Batas Pembayaran</div>
              <div className="text-sm font-medium text-red-600 dark:text-red-400">{Math.ceil((new Date(ticket?.deadline_confirmation!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} hari lagi</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 divide-y dark:divide-gray-700">
            <div className="p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Jenis Pelanggaran</div>
              <div className="font-medium mt-1">{ticket?.violation?.violation_type?.name}</div>
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Tanggal Pelanggaran</div>
              <div className="font-medium mt-1">{new Date(ticket?.violation?.created_at!).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" })}</div>
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Nomor Kendaraan</div>
              <div className="font-medium mt-1">{ticket?.violation?.vehicle_data?.number}</div>
            </div>
          </div>
        </div>
        <MidtransPayment paymentDialogChange={setOpen} snapToken={snapToken} />
      </DialogContent>
    </Dialog>
  );
}
