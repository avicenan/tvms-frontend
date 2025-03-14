import { Car } from "lucide-react";

export default function VehicleCard() {
  return (
    <>
      <div className="flex flex-col p-4 border border-zinc-200 rounded-xl gap-2">
        <div className="flex flex-col flex-wrap justify-between items-baseline mb-2">
          <span className="flex items-center gap-2 font-semibold text-lg">
            <Car /> Identitas Kendaraan
          </span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Nomor Kendaran</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">B-3244-KHK</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Jenis</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Sepeda Motor</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Merek</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Yamaha</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Tipe</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">NMax</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Warna</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Merah</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">No. HP</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">082187362367</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Email</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">siapa@gmail.com</span>
        </div>
      </div>
    </>
  );
}
