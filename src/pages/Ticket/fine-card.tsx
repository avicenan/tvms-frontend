import { Receipt } from "lucide-react";

export default function FineCard() {
  return (
    <>
      <div className="flex flex-col p-4 border border-zinc-200 rounded-xl gap-2">
        <div className="flex flex-col flex-wrap justify-between items-baseline mb-2">
          <span className="flex items-center gap-2 font-semibold text-lg">
            <Receipt /> Ticket Fines
          </span>
          {/* <span className="text-sm font-normal text-zinc-500">Tekan dua kali untuk melakukan perubahan</span> */}
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Payment Number</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">B-3244-KHK</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Amount</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">Rp. 350.000</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Status</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">Paid</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Method</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">QRIS</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Pay Time</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">Sunday, 29/12/2025 16:15</span>
        </div>
      </div>
    </>
  );
}
