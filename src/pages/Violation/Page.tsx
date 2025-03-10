import { useNavigate, useParams } from "react-router-dom";
import ConfirmViolationDialog from "./confirm-violation-dialog";
import CancelViolationDialog from "./cancel-violation-dialog";
import ValidationTimer from "./validation-timer";

export default function Violation() {
  const { violationId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 border-amber-200 pb-4">
      <div className="flex flex-wrap justify-between gap-x-2">
        <div className="flex-none scroll-m-20 text-lg font-bold tracking-tight lg:text-xl">Detail Pelanggaran {violationId}</div>
        <div className=" flex gap-x-2 items-center text-end justify-end">
          <div className=" text-sm font-normal text-zinc-500">Selesaikan proses validasi sebelum</div>
          <ValidationTimer time={600} timeoutNavigate={navigate} />
        </div>
      </div>
      <div className="flex flex-col gap-2 border border-dashed border-zinc-400 rounded-xl p-4">
        <div className="">
          <div className="text-lg font-semibold">Bukti pelanggaran</div>
          <div className="text-sm font-normal text-zinc-500">Rabu, 24-05-2025 13:30 - Jl. Telekomunikasi - CCTV hiwe78j</div>
        </div>
        <div className="flex gap-2 items-start flex-wrap">
          <img className="flex-1 max-h-96 object-contain bg-zinc-100" src="https://placehold.co/1000x600" alt="" />
          <div className="flex-initial flex xl:flex-col flex-nowrap overflow-x-scroll xl:overflow-x-hidden gap-2 items-start">
            <img src="https://placehold.co/600x400" alt="" className=" max-h-32" />
            <img src="https://placehold.co/600x400" alt="" className="max-h-32" />
            <div className="">
              <div className="">Jl. Telekomunikasi</div>
              <div className="">Rabu, 24-05-2025 13:30</div>
              <div className="">CCTV hiwe78j</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 gap-2 border border-zinc-400 rounded-xl border-dashed p-4">
          <div className="flex flex-col flex-wrap justify-between items-baseline mb-4">
            <span className="font-semibold text-lg">Informasi Deteksi</span>
            <span className="text-sm font-normal text-zinc-500">Tekan dua kali untuk melakukan perubahan</span>
          </div>
          <div className="flex flex-wrap justify-between items-baseline">
            <span className="font-normal flex-1 text-zinc-500">Nomor Kendaran</span>
            <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">B-3244-KHK</span>
          </div>
          <div className="flex flex-wrap justify-between items-baseline">
            <span className="font-normal flex-1 text-zinc-500">Jenis Kendaraan</span>
            <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Sepeda Motor</span>
          </div>
          <div className="flex flex-wrap justify-between items-baseline">
            <span className="font-normal flex-1 text-zinc-500">Merek Kendaraan</span>
            <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Yamaha</span>
          </div>
          <div className="flex flex-wrap justify-between items-baseline">
            <span className="font-normal flex-1 text-zinc-500">Tipe Kendaraan</span>
            <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">NMax</span>
          </div>
          <div className="flex flex-wrap justify-between items-baseline">
            <span className="font-normal flex-1 text-zinc-500">Warna Kendaraan</span>
            <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Merah</span>
          </div>
          <div className="flex flex-wrap justify-between items-baseline">
            <span className="font-normal flex-1 text-zinc-500">Jenis Pelanggaran</span>
            <span className="font-medium flex-1 sm:text-right text-start text-zinc-950">Helm</span>
          </div>
        </div>
        {/* <div className="flex flex-col gap-2 w-80 border border-zinc-400 rounded-xl border-dashed p-4">
          <div className="">
            <ValidationForm></ValidationForm>
          </div>
        </div> */}
        <div className="flex flex-col gap-2 w-full lg:w-80">
          <ConfirmViolationDialog />
          <CancelViolationDialog />
        </div>
      </div>
    </div>
  );
}
