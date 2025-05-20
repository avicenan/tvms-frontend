import { DialogTrigger, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";

export default function AppealEvidenceModal({ evidence }: { evidence: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(evidence);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="font-medium flex-1 sm:text-right text-start text-blue-600 hover:text-blue-500 cursor-pointer truncate dark:text-white flex justify-end gap-1 items-center">{data.split("/").pop()}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription>
          <img src={`https://api.etilang.web.id/storage/${evidence}`} alt="" className="max-h-200 mb-2 w-full bg-zinc-100 border border-zinc-200 rounded-lg object-contain" />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
