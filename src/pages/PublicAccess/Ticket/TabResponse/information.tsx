import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function InformationCard() {
  return (
    <Card className="" id="information-card">
      <CardHeader className="border-b">
        <CardTitle>Informasi</CardTitle>
        <CardDescription>Detail penting tentang pilihan Anda</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-medium">Pilihan Penyelesaian</AccordionTrigger>
            <AccordionContent>
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Terdapat beberapa pilihan penyelesaian yang dapat Anda pilih. Anda dapat membayar denda maksimal, menghadiri sidang, atau membantah pelanggaran.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-medium">Mengunggah Bukti</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sebelum membayar atau menghadiri sidang, Anda dapat mengunggah bukti untuk mengonfirmasi/membantah tilang yang diterima. Format bukti yang diterima termasuk JPG, PNG, PDF, dan MP4 file dengan ukuran hingga 10MB.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Bukti yang diunggah akan dikirim ke pihak berwenang untuk diproses dalam waktu 1-2 hari kerja. Setelah diproses, Anda akan menerima notifikasi melalui email/SMS/WhatsApp.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Apabila banding/bantahan Anda diterima, proses penilangan akan dihentikan. Anda tidak perlu membayar denda maupun menghadiri sidang. Namun jika bantahan ditolak, Anda tetap harus menyelesaikan proses tilang sesuai
                  ketentuan yang berlaku.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="font-medium">Pembayaran Denda Maksimal</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Anda dapat membayar denda maksimal sesuai dengan pelanggaran yang dilakukan melalui berbagai metode pembayaran seperti kartu kredit, kartu debit, e-wallet, atau transfer bank.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Pembayaran denda maksimal harus dilakukan sebelum tanggal jatuh tempo untuk menghindari penalti tambahan. Sebuah bukti pembayaran akan dikirim ke Anda melalui email/SMS/WhatsApp setelah pembayaran diproses.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="font-medium">Menghadiri Sidang</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Anda dapat menghadiri sidang untuk menentang pelanggaran yang dilakukan. Sidang akan dijadwalkan setelah anda membayar denda maksimal.</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Besaran denda akan disesuaikan berdasarkan hasil sidang. Jika denda yang ditetapkan lebih kecil dari denda maksimal yang telah dibayarkan, selisihnya akan dikembalikan. Sebaliknya, jika denda yang ditetapkan lebih besar,
                  Anda perlu membayar kekurangannya.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
