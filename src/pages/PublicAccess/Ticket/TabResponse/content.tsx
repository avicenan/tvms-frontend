import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Calendar, DollarSign, Scale, Upload } from "lucide-react";
import UploadAppealDialog from "./appealDialog";
import { useState } from "react";
import { TicketType } from "@/lib/types";
import PaymentDialog from "./paymentDialog";
export default function TabResponse({ ticket }: { ticket: TicketType }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
          <div className="font-medium">Respon diperlukan sebelum {new Date(ticket?.deadline_confirmation!).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" })}</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="h-full flex flex-col items-start">
            <CardTitle className="flex items-start mb-2">
              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
              Bayar Denda Online
            </CardTitle>
            <CardDescription>Bayar denda sebesar {""} menggunakan kartu kredit, debit kartu, atau transfer bank.</CardDescription>
          </CardHeader>
          <CardFooter>
            <PaymentDialog />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="h-full flex flex-col items-start">
            <CardTitle className="flex items-start mb-2">
              <Upload className="h-5 w-5 mr-2 text-blue-600" />
              Buat Bantahan
            </CardTitle>
            <CardDescription>Buat bantahan dengan mengunggah foto, video, atau dokumen yang mungkin mendukung kasus Anda.</CardDescription>
          </CardHeader>
          <CardFooter>
            <UploadAppealDialog ticketId={ticket.id} open={open} setOpen={setOpen} disabled={ticket.status !== "Himbauan"} />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="h-full flex flex-col items-start">
            <CardTitle className="flex items-start mb-2">
              <Scale className="h-5 w-5 mr-2 text-purple-600" />
              Hadiri Sidang
            </CardTitle>
            <CardDescription>Hadiri sidang hukum untuk menantang pelanggaran ini.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full cursor-pointer">
              Gugat Pelanggaran
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Informasi Tambahan</CardTitle>
          <CardDescription>Detail penting tentang pilihan Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Informasi Pembayaran</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pembayaran harus diterima sebelum tanggal jatuh tempo untuk menghindari penalti tambahan. Sebuah bukti pembayaran akan dikirim ke Anda setelah pembayaran diproses.</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Membantah Pelanggaran</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Jika Anda memilih untuk menantang pelanggaran ini, Anda perlu hadir dalam sidang hukum. Tanggal sidang akan dijadwalkan setelah Anda mengajukan permintaan.</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Mengunggah Bukti</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Anda dapat mengunggah bukti tambahan untuk mendukung kasus Anda. Format yang diterima termasuk JPG, PNG, PDF, dan MP4 file dengan ukuran hingga 20MB.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
