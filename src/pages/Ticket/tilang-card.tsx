import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy, Ticket } from "lucide-react";
import { TicketType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// const colorTheme = async (status: string) => {
//   switch (status.toLowerCase()) {
//     case "tilang":
//       return "bg-blue-400/20 border-blue-400";
//     case "himbauan":
//       return "bg-lime-400/20 border-lime-400";
//     case "persidangan":
//       return "bg-teal-400/20 border-teal-400";
//     case "sudah bayar":
//       return "bg-indigo-400/20 border-indigo-400";
//     case "lewat tenggat":
//       return "bg-zinc-400/20 border-zinc-400";
//     default:
//       return "bg-zinc-400/20 border-zinc-400";
//   }
// };

export default function TilangCard({ data }: { data: TicketType }) {
  const [badgeClass, setBadgeClass] = useState("");

  useEffect(() => {
    if (data.status) {
      switch (data.status.toLowerCase()) {
        case "tilang":
          setBadgeClass("bg-blue-400/20 border-blue-400");
          break;
        case "himbauan":
          setBadgeClass("bg-lime-400/20 border-lime-400");
          break;
        case "persidangan":
          setBadgeClass("bg-teal-400/20 border-teal-400");
          break;
        case "sudah bayar":
          setBadgeClass("bg-indigo-400/20 border-indigo-400");
          break;
        case "lewat tenggat":
          setBadgeClass("bg-zinc-400/20 border-zinc-400");
          break;
        default:
          setBadgeClass("bg-zinc-400/20 border-zinc-400");
      }
    }
  }, [data.status]);

  return (
    <Card>
      <CardHeader className="border-b border-zinc-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-5 w-5 text-primary" />
            <span className="font-semibold text-lg">Informasi Tilang</span>
          </div>
          <Badge variant={"outline"} className={badgeClass}>
            <span className="w-2 h-2 me-2 rounded-full bg-zinc-400 inline-block" />
            {data.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-xs font-medium text-zinc-500">Nomor Surat Tilang</p>
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold line-clamp-1">{data.id}</p>
                <Copy
                  className="w-4 h-4 cursor-pointer text-zinc-500 hover:text-zinc-700"
                  onClick={() => {
                    navigator.clipboard.writeText(data.id);
                    toast.success("Nomor surat tilang berhasil disalin");
                  }}
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Penindak</p>
              <p className="text-base font-semibold">{data.investigator?.name || "-"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Lokasi</p>
              <p className="text-base font-semibold">{data.violation?.camera?.location || "-"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Pelanggaran</p>
              <p className="text-base font-semibold">{data.violation?.violation_type?.name || "-"}</p>
            </div>
          </div>

          <div className="border-t pt-4 grid sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-xs font-medium text-zinc-500">Waktu Deteksi</p>
              <p className="text-xs font-semibold">
                {data.violation?.created_at
                  ? new Date(data.violation?.created_at).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })
                  : "-"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500">Waktu Terbit Surat Tilang</p>
              <p className="text-xs font-semibold">
                {new Date(data.created_at).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
