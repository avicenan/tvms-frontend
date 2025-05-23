import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ViolationType } from "@/lib/types";
import { Camera } from "lucide-react";

export default function EvidenceCard({ data }: { data: ViolationType }) {
  return (
    <Card>
      <CardHeader className="border-b border-zinc-200">
        <span className="flex items-center gap-2 font-semibold text-lg">
          <Camera /> Bukti Pelanggaran
        </span>
      </CardHeader>
      <CardContent>
        <div className="flex md:flex-wrap flex-nowrap gap-2">
          <div className="w-full flex items-center justify-center">
            <img className="flex-1 max-h-96 object-contain bg-zinc-100 rounded-lg border border-zinc-200" src={`https://api.etilang.web.id/storage/${data.violation_evidence}`} alt="" />
          </div>
          <div className="flex gap-2 w-full items-center flex-col md:flex-row">
            <div className="flex-1">
              <img src={`https://api.etilang.web.id/storage/${data.number_evidence}`} alt="" className="bg-zinc-100 w-full h-full rounded-lg border border-zinc-200 md:max-h-24 object-contain flex-1" />
            </div>
            <div className="flex-1">
              <img src={`https://api.etilang.web.id/storage/${data.number_evidence}`} alt="" className="bg-zinc-100 w-full h-full rounded-lg border border-zinc-200 md:max-h-24 object-contain flex-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
