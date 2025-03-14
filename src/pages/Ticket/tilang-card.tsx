import { Ticket } from "lucide-react";

export default function TilangCard() {
  return (
    <>
      <div className="flex flex-col p-4 border border-zinc-200 rounded-xl gap-2">
        <div className="flex flex-col flex-wrap justify-between items-baseline mb-2">
          <span className="flex items-center gap-2 font-semibold text-lg">
            <Ticket /> Informasi Tilang
          </span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">ID</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">B-3244-KHK</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Waktu Deteksi</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Rabu, 25/12/2025 14:30</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Lokasi</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Jl. Telekomunikasi, Kota Bandung</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Pelanggaran</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Helm</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Status</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Persidangan</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Penyidik</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Nurman</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Waktu Terbit Surat Tilang</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Kamis, 26/12/2025 1:30</span>
        </div>
      </div>
    </>
  );
}
