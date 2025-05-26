import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Receipt } from "lucide-react";
import { TicketType } from "@/lib/types";
import { capitalize, formatRupiah } from "@/lib/utils";

export default function FineCard({ data }: { data: TicketType }) {
  console.log(data, "fine");
  return (
    <Card>
      <CardHeader className="border-b border-zinc-200">
        <span className="flex items-center gap-2 font-semibold text-lg">
          <Receipt className="h-5 w-5 text-primary" /> Info Pembayaran
        </span>
        {/* <span className="text-sm font-normal text-zinc-500">Tekan dua kali untuk melakukan perubahan</span> */}
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-wrap justify-center items-baseline">
          <span className="font-normal flex-1 text-zinc-500">No. Transaksi</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">{data.payment?.order_id}</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Tanggal</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">
            {data.payment?.created_at &&
              new Date(data.payment?.created_at).toLocaleString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </span>
        </div>

        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Status</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">{data.payment?.status && capitalize(data.payment?.status)}</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Metode</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">{data.payment?.payment_method.toUpperCase()}</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Jumlah Dibayarkan</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">{data.payment?.amount ? formatRupiah(data.payment?.amount) : "-"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
