import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HearingScheduleType } from "@/lib/types";
import { Scale } from "lucide-react";

export default function CourtCard({ data }: { data: HearingScheduleType }) {
  return (
    <Card className="">
      <CardHeader className="flex flex-col flex-wrap justify-between items-baseline">
        <span className="flex items-center gap-2 font-semibold text-lg">
          <Scale className="text-primary" /> Info Persidangan
        </span>
        {/* <span className="text-sm font-normal text-zinc-500">Tekan dua kali untuk melakukan perubahan</span> */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal text-sm flex-1 text-zinc-500">Lokasi</span>
          <span className="font-medium text-sm flex-1 sm:text-right text-start text-zinc-950 dark:text-white">{data.location}</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal text-sm  flex-1 text-zinc-500">Jadwal</span>
          <span className="font-medium text-sm flex-1 sm:text-right text-start text-zinc-950 dark:text-white">
            {new Date(data.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric" })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
