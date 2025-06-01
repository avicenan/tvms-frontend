import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Calendar, DollarSign, Scale, Upload, FileImage, Check, FileClock } from "lucide-react";
import UploadAppealDialog from "./appeal-dialog";
import { useState } from "react";
import { TicketType } from "@/lib/types";
import PaymentDialog from "./payment-dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import CourtDialog from "./court-dialog";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils";
import { capitalize } from "@/lib/utils";

export default function TabResponse({ ticket }: { ticket: TicketType }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      {ticket.status === "Himbauan" && (
        <div className="bg-amber-50 dark:bg-amber-900/20 outline outline-amber-200 dark:outline-amber-800 rounded-lg p-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
            <div className="font-medium">Respons diperlukan sebelum {new Date(ticket?.deadline_confirmation!).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" })}</div>
          </div>
        </div>
      )}

      {ticket.status === "Pengajuan Banding" && ticket.appeal?.status === "Pending" && (
        <Card className="outline-2 outline-yellow-300 shadow-md shadow-yellow-100 dark:outline-yellow-800">
          <CardHeader>
            <CardTitle>Banding Diajukan</CardTitle>
            <CardDescription>Banding diajukan, menunggu hasil banding.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-6">
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal</p>
                <p className="">{ticket?.appeal?.created_at ? new Date(ticket?.appeal?.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}</p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                <Badge className="bg-yellow-50 border-yellow-500 font-semibold text-yellow-500">
                  <FileClock className="h-4 w-4" /> {ticket?.appeal?.status ? ticket?.appeal?.status.toUpperCase() : "-"}
                </Badge>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Argumentasi</p>
                <p className="italic">"{ticket?.appeal?.argument ? ticket?.appeal?.argument : "-"}"</p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Bukti</p>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="outline" size="sm" className="w-full cursor-pointer">
                      <FileImage className="h-4 w-4" /> Bukti
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <img src={`${import.meta.env.VITE_API_URL}/storage/${ticket?.appeal?.evidence}`} alt="Bukti Banding" className="w-full max-h-[80vh] object-contain" />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {ticket.status === "Banding Diterima" && ticket.appeal?.status === "Accepted" && (
        <Card className="outline-2 outline-blue-300 shadow-md shadow-blue-100 dark:outline-blue-800">
          <CardHeader>
            <CardTitle>Banding Diterima</CardTitle>
            <CardDescription>Banding diterima, penilangan telah selesai.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-6">
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal</p>
                <p className="">{ticket?.appeal?.created_at ? new Date(ticket?.appeal?.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}</p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                <Badge className="bg-blue-50  border-blue-500 font-semibold text-blue-500">
                  <Check /> {ticket?.appeal?.status ? ticket?.appeal?.status.toUpperCase() : "-"}
                </Badge>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Argumentasi</p>
                <p className="italic">"{ticket?.appeal?.argument ? ticket?.appeal?.argument : "-"}"</p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Bukti</p>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="outline" size="sm" className="w-full cursor-pointer">
                      <FileImage className="h-4 w-4" /> Bukti
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <img src={`${import.meta.env.VITE_API_URL}/storage/${ticket?.appeal?.evidence}`} alt="Bukti Banding" className="w-full max-h-[80vh] object-contain" />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Keterangan</p>
                <p className="italic">"{ticket?.appeal?.note ? ticket?.appeal?.note : "-"}"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {ticket.status === "Himbauan" && ticket.appeal?.status === "Rejected" && (
        <Card className="outline-2 outline-red-300 shadow-md shadow-red-200 dark:outline-red-800">
          <CardHeader>
            <CardTitle>Banding Ditolak</CardTitle>
          </CardHeader>
        </Card>
      )}

      {ticket.status === "Sudah Bayar" && ticket.payment?.status === "settlement" && (
        <Card className="outline-2 outline-green-300 shadow-md shadow-green-200 dark:outline-green-800">
          <CardHeader>
            <CardTitle>Denda Telah Dibayarkan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Metode Pembayaran</p>
                <p className="truncate">{ticket?.payment?.payment_method ? ticket?.payment?.payment_method.toUpperCase() : "-"}</p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Jumlah Pembayaran</p>
                <p className="truncate">{ticket?.payment?.amount ? formatRupiah(ticket?.payment?.amount) : "-"}</p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal Pembayaran</p>
                <p className="truncate">{ticket?.payment?.created_at ? new Date(ticket?.payment?.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-"}</p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                <p className="truncate">{ticket?.payment?.status ? ticket?.payment?.status == "settlement" && "Lunas" : ticket?.payment?.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {ticket.status === "Sudah Bayar" && ticket.payment?.status === "pending" && (
        <Card className="outline-2 outline-green-300 shadow-md shadow-green-200 dark:outline-green-800">
          <CardHeader>
            <CardTitle>Denda Belum Dibayarkan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Metode Pembayaran</p>
                <p className="truncate">{ticket?.payment?.payment_method ? ticket?.payment?.payment_method.toUpperCase() : "-"}</p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Jumlah Pembayaran</p>
                <p className="truncate">{ticket?.payment?.amount ? formatRupiah(ticket?.payment?.amount) : "-"}</p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal Pembayaran</p>
                <p className="truncate">{ticket?.payment?.created_at ? new Date(ticket?.payment?.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-"}</p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                <p className="truncate">{capitalize(ticket?.payment?.status)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {ticket.status === "Persidangan" && ticket.payment?.status === "settlement" && (
        <Card className="outline-2 outline-green-300 shadow-md shadow-green-200 dark:outline-green-800">
          <CardHeader>
            <CardTitle>Informasi Persidangan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Lokasi</p>
                <p className="truncate">{ticket?.hearing_schedule?.location || "-"}</p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Jadwal</p>
                <p className="truncate">
                  {ticket?.hearing_schedule?.date
                    ? new Date(ticket.hearing_schedule.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500 dark:text-gray-400">Pembayaran</p>
                <p className="flex items-center gap-2">
                  {ticket.payment.amount ? formatRupiah(ticket.payment.amount) : "-"}
                  <span className="truncate text-green-600 font-medium">{ticket?.payment?.status ? ticket?.payment?.status == "settlement" && "Lunas" : ticket?.payment?.status}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {ticket.status === "Lewat Tenggat" && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-red-700 dark:text-red-400">Batas Waktu Terlewat</h3>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1">Batas waktu respon telah terlewat. Silakan hubungi pihak berwenang untuk informasi lebih lanjut.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {ticket.status === "Himbauan" && (
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
              <PaymentDialog ticket={ticket} disabled={ticket.status !== "Himbauan" || ticket.payment?.status === "settlement"} />
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
              <UploadAppealDialog ticketId={ticket.id} open={open} setOpen={setOpen} disabled={ticket.status !== "Himbauan" || ticket.appeal !== null} />
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
              <CourtDialog ticket={ticket} disabled={ticket.status !== "Himbauan"} />
            </CardFooter>
          </Card>
        </div>
      )}

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
