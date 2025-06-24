import { Card, CardContent } from "@/components/ui/card";
import { TicketType } from "@/lib/types";

export default function ProgressBar({ ticket }: { ticket: TicketType }) {
  return (
    <Card className="py-4 px-0 rounded-lg drop-shadow-sm">
      <CardContent className="flex items-center gap-2">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${ticket.notifications ? "bg-blue-500 text-white dark:bg-blue-600" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}
          onClick={() => {
            const notification = document.getElementById("notification");
            if (notification) {
              notification.classList.add("drop-shadow-2xl", "transition-all", "duration-300");
              notification.scrollIntoView({ behavior: "smooth", block: "start" });
              setTimeout(() => {
                notification.classList.remove("drop-shadow-2xl");
              }, 1000);
            }
          }}
        >
          {ticket.notifications ? "✓" : "○"} Mengirim Pemberitahuan
        </div>
        <div className="text-gray-400 dark:text-gray-500">→</div>
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
            ticket.appeal?.status === "Accepted" || ticket.appeal?.status === "Rejected" ? "bg-blue-500 text-white dark:bg-blue-600" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          }`}
          onClick={() => {
            const appeal = document.getElementById("appeal");
            if (appeal) {
              appeal.classList.add("drop-shadow-2xl", "transition-all", "duration-300");
              appeal.scrollIntoView({ behavior: "smooth", block: "start" });
              setTimeout(() => {
                appeal.classList.remove("drop-shadow-2xl");
              }, 1000);
            }
          }}
        >
          {ticket.appeal?.status === "Accepted" || ticket.appeal?.status === "Rejected" ? "✓" : "○"} Memproses Banding
        </div>
        <div className="text-gray-400 dark:text-gray-500">→</div>
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
            ticket.payment?.status === "settlement" || ticket.appeal?.status === "Accepted" || ticket.status === "Persidangan" ? "bg-green-500 text-white dark:bg-green-600" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {ticket.payment?.status === "settlement" || ticket.appeal?.status === "Accepted" || ticket.status === "Persidangan" ? "✓" : "○"} Tilang Selesai
          {ticket.payment?.status === "settlement" && ticket.status === "Sudah Bayar" && ": Denda Maksimal"}
          {ticket.appeal?.status === "Accepted" && ticket.status === "Banding Diterima" && ": Banding Diterima"}
          {ticket.status === "Persidangan" && ": Persidangan"}
        </div>
      </CardContent>
    </Card>
  );
}
