import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send } from "lucide-react";
import EmailForm from "./email-form";
import SMSForm from "./sms-form";

export default function SendNotificationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Send /> Kirim Pemberitahuan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kirim Pemberitahuan</DialogTitle>
          <DialogDescription>Kirim pemberitahuan melalui Email dan SMS</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="email" className="gap-4">
          <TabsList className="w-full">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <EmailForm />
          </TabsContent>
          <TabsContent value="sms">
            <SMSForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
