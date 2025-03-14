import { Button } from "@/components/ui/button";
import { History, Ticket } from "lucide-react";

export default function ActivityCard() {
  return (
    <>
      <div className="p-4 border border-zinc-200 rounded-xl gap-2">
        <div className="flex flex-col flex-wrap justify-between items-baseline mb-2">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <History /> Aktifitas
          </div>

          {/* <span className="text-sm font-normal text-zinc-500">Tekan dua kali untuk melakukan perubahan</span> */}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button variant={"secondary"} className="mt-1">
              <Ticket />
            </Button>
            <div className="flex flex-1">
              <div className="flex-initial ">
                <span className="font-medium text-sm">Surat Tilang</span>
                <span className="hidden md:block text-xs text-zinc-500">Updated your profile information.</span>
              </div>
              <div className="flex flex-1 justify-end items-end">
                <span className=" text-xs text-zinc-500">Kamis, 27 Agustus 2023</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant={"secondary"} className="mt-1">
              <Ticket />
            </Button>
            <div className="flex flex-1">
              <div className="flex-initial ">
                <span className="font-medium text-sm">Surat Tilang</span>
                <span className="hidden md:block text-xs text-zinc-500">Updated your profile information.</span>
              </div>
              <div className="flex flex-1 justify-end items-end">
                <span className=" text-xs text-zinc-500">Kamis, 27 Agustus 2023</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant={"secondary"} className="mt-1">
              <Ticket />
            </Button>
            <div className="flex flex-1">
              <div className="flex-initial ">
                <span className="font-medium text-sm">Surat Tilang</span>
                <span className="hidden md:block text-xs text-zinc-500">Updated your profile information.</span>
              </div>
              <div className="flex flex-1 justify-end items-end">
                <span className=" text-xs text-zinc-500">Kamis, 27 Agustus 2023</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant={"secondary"} className="mt-1">
              <Ticket />
            </Button>
            <div className="flex flex-1">
              <div className="flex-initial ">
                <span className="font-medium text-sm">Surat Tilang</span>
                <span className="hidden md:block text-xs text-zinc-500">Updated your profile information.</span>
              </div>
              <div className="flex flex-1 justify-end items-end">
                <span className=" text-xs text-zinc-500">Kamis, 27 Agustus 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
