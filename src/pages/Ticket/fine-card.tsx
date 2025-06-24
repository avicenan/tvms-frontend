import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TicketType } from "@/lib/types";
import { capitalize, formatRupiah } from "@/lib/utils";

export default function FineCard({ data }: { data: TicketType }) {
  return (
    <Card>
      <CardHeader>
        <span className="flex items-center gap-2 font-semibold text-lg">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary text-primary text-[10px] font-bold p-[10px]">Rp</span>
          Info Pembayaran
        </span>
        {/* <span className="text-sm font-normal text-zinc-500">Tekan dua kali untuk melakukan perubahan</span> */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center items-baseline">
          <span className="font-normal text-sm flex-1 text-zinc-500">No. Transaksi</span>
          <span className="font-medium text-sm flex-1 sm:text-right text-start text-zinc-950 dark:text-white">{data.payment?.order_id}</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal text-sm flex-1 text-zinc-500">Tanggal</span>
          <span className="font-medium text-sm flex-1 sm:text-right text-start text-zinc-950 dark:text-white">
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
          <span className="font-normal text-sm flex-1 text-zinc-500">Status</span>
          <span className="font-medium text-sm flex-1 sm:text-right text-start text-zinc-950 dark:text-white">{data.payment?.status && capitalize(data.payment?.status)}</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal text-sm flex-1 text-zinc-500">Metode</span>
          <span className="font-medium text-sm flex-1 sm:text-right text-start text-zinc-950 dark:text-white">{data.payment?.payment_method.toUpperCase()}</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal text-sm flex-1 text-zinc-500">Jumlah Dibayarkan</span>
          <span className="font-medium text-sm flex-1 sm:text-right text-start text-zinc-950 dark:text-white">{data.payment?.amount ? formatRupiah(data.payment?.amount) : "-"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
