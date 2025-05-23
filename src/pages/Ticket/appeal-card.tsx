import { MessageSquare } from "lucide-react";
import { AppealDialog } from "./appeal-dialog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TicketType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import AppealEvidenceModal from "./appeal-evidence-modal";

export default function AppealCard({ data }: { data: TicketType }) {
  return (
    <Card className="">
      <CardHeader className="flex flex-wrap justify-between items-center border-b border-zinc-200">
        <span className="flex items-center gap-2 font-semibold text-lg">
          <MessageSquare /> Banding
        </span>
        <Badge
          variant={"outline"}
          className={` ${
            data.appeal?.status.toLowerCase() === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : data.appeal?.status.toLowerCase() === "accepted"
              ? "bg-green-100 text-green-800"
              : data.appeal?.status.toLowerCase() === "rejected"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <span className={`w-2 h-2 me-1 text-xs font-semibold rounded-full bg-zinc-400`} />
          {data.appeal?.status}
        </Badge>
        {/* <span className="text-sm font-normal text-zinc-500">Tekan dua kali untuk melakukan perubahan</span> */}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex text-zinc-500">Alasan</span>
          <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">"{data.appeal?.argument}"</span>
        </div>
        <div className="flex flex-wrap justify-between items-baseline">
          <span className="font-normal flex-1 text-zinc-500">Lampiran</span>
          {/* <div className="font-medium flex-1 sm:text-right text-start text-blue-600 hover:text-blue-500 cursor-pointer truncate dark:text-white flex justify-end gap-1 items-center">{data.appeal?.evidence.split("/").pop()}</div> */}
          {data.appeal?.evidence && <AppealEvidenceModal evidence={data.appeal.evidence} />}
        </div>
        {data.appeal?.note && (
          <div className="flex flex-wrap justify-between items-baseline">
            <span className="font-normal flex-1 text-zinc-500">Catatan</span>
            <span className="font-medium flex-1 sm:text-right text-start text-zinc-950 dark:text-white">“{data.appeal?.note}”</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">{data.appeal?.status.toLowerCase() === "pending" && <AppealDialog {...data.appeal} />}</CardFooter>
    </Card>
  );
}
