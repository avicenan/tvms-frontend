import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function EmailForm() {
  return (
    <div className="px-2">
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Tujuan</Label>
            <Input id="email" placeholder="john@gmail.com" readOnly />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="subject">Subjek</Label>
            <Input id="subject" placeholder="Tilang Elektronik - 923x-234d-sqe8" readOnly />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="body">Pesan</Label>
            <Textarea id="body" placeholder="..." readOnly />
          </div>
          <div className="flex justify-end">
            <Button>
              <Send /> Kirim
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
