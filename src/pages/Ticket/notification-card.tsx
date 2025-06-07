import { Loader2, MailPlus, Send } from "lucide-react";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { TicketType } from "@/lib/types";
import NotificationIcon from "./notification-icon";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { notificationApi } from "@/lib/api";
import { toast } from "sonner";

export default function NotificationCard({ ticket, onUpdate }: { ticket: TicketType; onUpdate: (boolean: boolean) => void }) {
  const [isSending, setIsSending] = useState(false);
  const { sendAllNotification } = notificationApi;

  const handleSendNotification = async () => {
    try {
      setIsSending(true);
      const response = await sendAllNotification(ticket.id);
      console.log(response, "response");
      toast.success("Pemberitahuan berhasil dikirim", {
        description: `
        Email: ${response.data.email ? "Dikirim" : "Gagal Mengirim"} (${response.data.email?.message}) |
        WhatsApp: ${response.data.whatsapp ? "Dikirim" : "Gagal Mengirim"} (${response.data.whatsapp?.message}) |
        SMS: ${response.data.sms ? "Dikirim" : "Gagal Mengirim"} (${response.data.sms?.message})`,
      });
      onUpdate(true);
    } catch (error) {
      toast.error("Pemberitahuan gagal dikirim", { description: (error as any).response.data.message });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 font-semibold text-lg">
          <MailPlus className="text-primary" /> Pemberitahuan
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div className="flex-1 flex gap-1">
            <NotificationIcon isSent={ticket.notifications?.whatsapp?.[ticket.notifications?.whatsapp?.length - 1]?.is_sent ?? false} />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">WhatsApp</div>
              <div className="text-xs text-zinc-500">
                {ticket.notifications?.whatsapp?.[ticket.notifications?.whatsapp?.length - 1]?.is_sent
                  ? new Date(ticket.notifications?.whatsapp[ticket.notifications?.whatsapp?.length - 1]?.updated_at).toLocaleDateString("id-ID", { day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
                  : "Belum dikirim"}
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-1">
            <NotificationIcon isSent={ticket.notifications?.sms?.[ticket.notifications?.sms?.length - 1]?.is_sent ?? false} />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">SMS</div>
              <div className="text-xs text-zinc-500">
                {ticket.notifications?.sms?.[ticket.notifications?.sms?.length - 1]?.is_sent
                  ? new Date(ticket.notifications?.sms[ticket.notifications?.sms?.length - 1]?.updated_at).toLocaleDateString("id-ID", { day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
                  : "Belum dikirim"}
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-1">
            <NotificationIcon isSent={ticket.notifications?.email?.[ticket.notifications?.email?.length - 1]?.is_sent ?? false} />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">Email</div>
              <div className="text-xs text-zinc-500">
                {ticket.notifications?.email?.[ticket.notifications?.email?.length - 1]?.is_sent
                  ? new Date(ticket.notifications?.email[ticket.notifications?.email?.length - 1]?.updated_at).toLocaleDateString("id-ID", { day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
                  : "Belum dikirim"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardContent className="flex flex-wrap justify-between items-end gap-2">
        <span className="flex-1 text-xs font-normal text-zinc-500">Kirim sebelum {new Date(ticket.deadline_confirmation).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "numeric", year: "numeric" })}</span>
        {ticket.status !== "Sudah Bayar" && ticket.status !== "Persidangan" && ticket.status !== "Banding Diterima" && (
          <Button className="cursor-pointer" onClick={handleSendNotification} disabled={isSending}>
            {isSending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Mengirim Pemberitahuan
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send /> Kirim Pemberitahuan
              </span>
            )}
          </Button>
        )}
        {/* <SendNotificationDialog ticketId={data.id} /> */}
      </CardContent>
    </Card>
  );
}
