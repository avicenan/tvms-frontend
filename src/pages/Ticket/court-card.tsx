import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HearingScheduleType } from "@/lib/types";
import { Scale } from "lucide-react";

export default function CourtCard({ data }: { data: HearingScheduleType }) {
  console.log(data, "court data");
  return (
    <Card className="">
      <CardHeader className="flex flex-col flex-wrap justify-between items-baseline mb-2">
        <span className="flex items-center gap-2 font-semibold text-lg">
          <Scale /> Informasi Persidangan
        </span>
        {/* <span className="text-sm font-normal text-zinc-500">Tekan dua kali untuk melakukan perubahan</span> */}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Lokasi</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">B-3244-KHK</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Jadwal</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">Sabtu, 28/12/2025</span>
        </div>
      </CardContent>
    </Card>
  );
}
