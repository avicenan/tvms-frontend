import { CheckCircle2Icon, CircleAlert, MailPlus } from "lucide-react";
import { SendNotificationDialog } from "./send-notification-dialog";

export default function NotificationCard() {
  return (
    <>
      <div className="flex flex-col p-4 border border-zinc-200 rounded-xl gap-4">
        <div className="flex flex-col flex-wrap justify-between items-baseline mb-2">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <MailPlus /> Pemberitahuan
          </div>
        </div>
        <div className="flex mb-4">
          <div className="flex-1 flex gap-1">
            <CheckCircle2Icon color="black" fill="blue" fillOpacity={0.5} className="mt-[2px]" />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">Email</div>
              <div className="text-xs text-zinc-500">Kamis, 27 Agustus 2023</div>
            </div>
          </div>
          <div className="flex-1 flex gap-1">
            <CircleAlert color="black" fill="yellow" fillOpacity={0.5} className="mt-[2px]" />
            <div className="flex flex-col">
              <div className="font-semibold text-sm">SMS</div>
              <div className="text-xs text-zinc-500">Belum dikirim</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-baseline gap-2">
          <span className=" text-sm font-normal text-zinc-500">Kirim himbauan sebelum Jumat, 27-12-2025</span>
          <SendNotificationDialog />
        </div>
      </div>
    </>
  );
}
