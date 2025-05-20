import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquareReply } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AppealType } from "@/lib/types";
import { useState } from "react";
import { appealApi } from "@/lib/api";
import { toast } from "sonner";

interface DecisionType {
  status: "Accepted" | "Rejected" | "Pending";
  note: string;
}

export function AppealDialog(appeal: AppealType) {
  const { updateAppeal } = appealApi;
  const [isLoading, setIsLoading] = useState(false);
  const [decision, setDecision] = useState<DecisionType>({
    status: "Rejected",
    note: "",
  });

  const acceptAppeal = async () => {
    try {
      setIsLoading(true);
      const response = await updateAppeal(appeal.id, { status: "Accepted", note: decision.note });
      toast.success("Berhasil memproses banding", { description: response.data.message });
    } catch (error) {
      toast.error("Gagal memproses banding", { description: (error as any).response.data.message });
      console.error("Error accepting appeal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const rejectAppeal = async () => {
    try {
      setIsLoading(true);
      const response = await updateAppeal(appeal.id, { status: "Rejected", note: decision.note });
      toast.success("Berhasil memproses banding", { description: response.data.message });
    } catch (error) {
      toast.error("Gagal memproses banding", { description: (error as any).response.data.message });
      console.error("Error rejecting appeal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <MessageSquareReply />
          Proses Banding
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Proses Banding</DialogTitle>
          <DialogDescription>Tentukan apakah banding diterima atau tidak</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <img src={`https://api.etilang.web.id/storage/${appeal.evidence}`} alt="" className="max-h-70 mb-2 w-full bg-zinc-100 border border-zinc-200 rounded-lg object-contain" />
          <div className="space-y-2">
            <Label htmlFor="terms">Pernyataan pelanggar</Label>
            <div className="bg-zinc-100 border border-zinc-200 text-zinc-700 p-2 rounded-lg">"{appeal.argument}"</div>
          </div>
          <form className="space-y-2">
            <Label htmlFor="note">Catatan</Label>
            <Textarea placeholder="Berikan catatan atas keputusan banding" disabled={isLoading} onChange={(e) => setDecision({ ...decision, note: e.target.value })} />
          </form>
        </div>
        <DialogFooter>
          <div className="flex gap-1 w-full">
            <Button variant={"destructive"} disabled={isLoading} className="flex-1 font-semibold cursor-pointer" onClick={rejectAppeal}>
              Tolak
            </Button>
            <Button disabled={isLoading} className="flex-1 font-semibold cursor-pointer" onClick={acceptAppeal}>
              Terima
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
