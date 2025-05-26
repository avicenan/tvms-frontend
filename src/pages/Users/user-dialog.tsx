import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { UserCog } from "lucide-react";
import { InvestigatorType } from "@/lib/types";

export default function UserDialog({ user }: { user: InvestigatorType }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="sm" asChild>
          <UserCog className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User {user.name}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
