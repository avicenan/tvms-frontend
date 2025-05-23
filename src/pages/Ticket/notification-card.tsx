import { MailPlus, Send } from "lucide-react";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { TicketType } from "@/lib/types";
import NotificationIcon from "./notification-icon";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { notificationApi, ticketApi } from "@/lib/api";

export default function NotificationCard({ data, setTicket }: { data: TicketType; setTicket: (ticket: TicketType) => void }) {
  const [isSending, setIsSending] = useState(false);
  const [updatedTicket, setUpdatedTicket] = useState<TicketType>(data);
  const { sendAllNotification } = notificationApi;

  const handleSendNotification = async () => {
    try {
      setIsSending(true);
      const response = await sendAllNotification(data.id);
      toast.success("Pemberitahuan berhasil dikirim", {
        description: `Email: ${response.data.email?.[response.data.email?.length - 1]?.is_sent ? "Dikirim" : "Gagal Mengirim"}, WhatsApp: ${
          response.data.whatsapp?.[response.data.whatsapp?.length - 1]?.is_sent ? "Dikirim" : "Gagal Mengirim"
        }, SMS: ${response.data.sms?.[response.data.sms?.length - 1]?.is_sent ? "Dikirim" : "Gagal Mengirim"}`,
      });
      const ticket = await ticketApi.getTicketById(data.id);
      setUpdatedTicket(ticket.data.data);
    } catch (error) {
      toast.error("Pemberitahuan gagal dikirim", { description: (error as any).response.data.message });
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    setTicket(updatedTicket);
  }, [updatedTicket]);

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
            <NotificationIcon isSent={data.notifications?.whatsapp?.[data.notifications?.whatsapp?.length - 1]?.is_sent ?? false} />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">WhatsApp</div>
              <div className="text-xs text-zinc-500">
                {data.notifications?.whatsapp?.[data.notifications?.whatsapp?.length - 1]?.is_sent
                  ? new Date(data.notifications?.whatsapp[data.notifications?.whatsapp?.length - 1]?.updated_at).toLocaleDateString("id-ID", { day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
                  : "Belum dikirim"}
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-1">
            <NotificationIcon isSent={data.notifications?.sms?.[data.notifications?.sms?.length - 1]?.is_sent ?? false} />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">SMS</div>
              <div className="text-xs text-zinc-500">
                {data.notifications?.sms?.[data.notifications?.sms?.length - 1]?.is_sent
                  ? new Date(data.notifications?.sms[data.notifications?.sms?.length - 1]?.updated_at).toLocaleDateString("id-ID", { day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
                  : "Belum dikirim"}
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-1">
            <NotificationIcon isSent={data.notifications?.email?.[data.notifications?.email?.length - 1]?.is_sent ?? false} />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">Email</div>
              <div className="text-xs text-zinc-500">
                {data.notifications?.email?.[data.notifications?.email?.length - 1]?.is_sent
                  ? new Date(data.notifications?.email[data.notifications?.email?.length - 1]?.updated_at).toLocaleDateString("id-ID", { day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
                  : "Belum dikirim"}
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
