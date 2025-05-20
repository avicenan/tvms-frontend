import { MailPlus, Send } from "lucide-react";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { TicketType } from "@/lib/types";
import NotificationIcon from "./notification-icon";
import { useState } from "react";
import SendNotificationDialog from "./send-notification-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { notificationApi } from "@/lib/api";

export default function NotificationCard({ data }: { data: TicketType }) {
  const [isSending, setIsSending] = useState(false);
  const { sendAllNotification } = notificationApi;

  const handleSendNotification = async () => {
    try {
      setIsSending(true);
      const response = await sendAllNotification(data.id);
      toast.success("Pemberitahuan berhasil dikirim", { description: response.data.message });
    } catch (error) {
      toast.error("Pemberitahuan gagal dikirim", { description: (error as any).response.data.message });
    } finally {
      setIsSending(false);
    }
  };
  return (
    <Card>
      <CardHeader className="border-b border-zinc-200">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <MailPlus /> Pemberitahuan
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div className="flex-1 flex gap-1">
            <NotificationIcon isSent={data.notifications?.whatsapp?.is_sent ?? false} />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">WhatsApp</div>
              <div className="text-xs text-zinc-500">
                {data.notifications?.whatsapp?.is_sent ? new Date(data.notifications?.whatsapp?.updated_at).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "numeric", year: "numeric" }) : "Belum dikirim"}
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-1">
            <NotificationIcon isSent={data.notifications?.sms?.is_sent ?? false} />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">SMS</div>
              <div className="text-xs text-zinc-500">
                {data.notifications?.sms?.is_sent ? new Date(data.notifications?.sms?.updated_at).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "numeric", year: "numeric" }) : "Belum dikirim"}
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-1">
            <NotificationIcon isSent={data.notifications?.email?.is_sent ?? false} />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">Email</div>
              <div className="text-xs text-zinc-500">
                {data.notifications?.email?.is_sent ? new Date(data.notifications?.email?.updated_at).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "numeric", year: "numeric" }) : "Belum dikirim"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardContent className="flex flex-wrap justify-between items-end gap-2">
        <span className="flex-1 text-xs font-normal text-zinc-500">Kirim sebelum {new Date(data.deadline_confirmation).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "numeric", year: "numeric" })}</span>
        <Button className="cursor-pointer" onClick={handleSendNotification} disabled={isSending}>
          <Send /> Kirim Pemberitahuan
        </Button>
        {/* <SendNotificationDialog ticketId={data.id} /> */}
      </CardContent>
    </Card>
  );
}
