import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Receipt } from "lucide-react";
import { TicketType } from "@/lib/types";

export default function FineCard({ data }: { data: TicketType }) {
  console.log(data, "fine");
  return (
    <Card>
      <CardHeader>
        <span className="flex items-center gap-2 font-semibold text-lg">
          <Receipt /> Denda Tilang
        </span>
        {/* <span className="text-sm font-normal text-zinc-500">Tekan dua kali untuk melakukan perubahan</span> */}
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">No. Pembayaran</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">B-3244-KHK</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Besaran Denda</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">Rp. 350.000</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Status</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">Lunas</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Metode</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">QRIS</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Waktu Pembayaran</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">Minggu, 29/12/2025 16:15</span>
        </div>
      </CardContent>
    </Card>
  );
}
