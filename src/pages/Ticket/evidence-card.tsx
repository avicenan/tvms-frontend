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
        <div className="flex flex-wrap gap-2">
          <img className="flex-1 max-h-96 object-contain bg-zinc-100 rounded-lg" src={`https://api.etilang.web.id/storage/${data.violation_evidence}`} alt="" />
          <div className="flex flex-row md:flex-col gap-2 items-start">
            <img src={`https://api.etilang.web.id/storage/${data.number_evidence}`} alt="" className="rounded-lg object-contain" />
            <img src={`https://api.etilang.web.id/storage/${data.number_evidence}`} alt="" className="rounded-lg object-contain" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
