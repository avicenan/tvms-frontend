import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { History, Ticket } from "lucide-react";
import { ActivityType } from "@/lib/types";

export default function ActivityCard({ data }: { data: ActivityType[] }) {
  return (
    <Card>
      <CardHeader className="border-b border-zinc-200">
        <span className="flex items-center gap-2 font-semibold text-lg">
          <History /> Aktivitas
        </span>

        {/* <span className="text-sm font-normal text-zinc-500">Tekan dua kali untuk melakukan perubahan</span> */}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {data.map((item) => (
          <div className="flex gap-2">
            <Button variant={"secondary"} className="mt-1">
              <Ticket />
            </Button>
            <div className="flex flex-1">
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-zinc-500 line-clamp-2">{item.description}</p>
              </div>
              <div className="flex flex-intial justify-end items-start">
                <p className=" text-xs text-zinc-500">{new Date(item.created_at).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric" })}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
