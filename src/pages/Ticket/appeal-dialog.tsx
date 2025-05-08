import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquareReply } from "lucide-react";
// import EmailForm from "./email-form";
// import SMSForm from "./sms-form";
import { useForm } from "@tanstack/react-form";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AppealDialog() {
  const form = useForm({
    defaultValues: {
      decision: false,
      notes: "",
    },
  });
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
        {/* <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form> */}
        <div className="flex flex-col gap-2">
          <img src="https://placehold.co/600x400" alt="" className="max-h-40 w-full bg-zinc-100 rounded-xl" />
          <div className="flex flex-col gap-2">
            <Label htmlFor="terms">Pernyataan pelanggar</Label>
            <div className="bg-zinc-100 p-2 rounded-xl">"Saya sudah memakai helm"</div>
          </div>
          <form
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="mt-4"
          >
            <form.Field
              name="notes"
              children={() => (
                <>
                  <Label htmlFor="terms" className="mb-2">
                    Catatan
                  </Label>
                  <Textarea placeholder="Berikan catatan atas keputusan banding" />
                </>
              )}
            />
          </form>
        </div>
        <DialogFooter>
          <div className="flex gap-1 w-full">
            <Button variant={"outline"} className="flex-1">
              Tolak
            </Button>
            <Button className="flex-1">Terima</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
