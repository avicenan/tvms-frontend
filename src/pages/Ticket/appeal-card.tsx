import { Expand, MessageSquare } from "lucide-react";
import { AppealDialog } from "./appeal-dialog";

export default function AppealCard() {
  return (
    <>
      <div className="flex flex-col p-4 border border-zinc-200 rounded-xl gap-2">
        <div className="flex flex-col flex-wrap justify-between items-baseline mb-2">
          <span className="flex items-center gap-2 font-semibold text-lg">
            <MessageSquare /> Banding
          </span>
          {/* <span className="text-sm font-normal text-zinc-500">Tekan dua kali untuk melakukan perubahan</span> */}
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Alasan</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">“Saya sudah memakai helm”</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Lampiran</span>
          <div className="font-medium flex-1 sm:text-right text-start text-blue-600 hover:text-blue-500 cursor-pointer dark:text-white flex justify-end gap-1 items-center">
            gambar.jpg <Expand size={14} className="mt-1" />
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Keputusan</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">Ditolak</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Catatan</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">“Tidak terlihat mengenakan helm”</span>
        </div>
        <div className="flex flex-wrap justify-end items-center gap-2">
          {/* <span className="flex-1 text-sm font-normal text-zinc-500">
            Kirim pemberitahuan sebelum <br /> Jumat, 27-12-2025
          </span> */}
          <AppealDialog />
        </div>
      </div>
    </>
  );
}
