import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

export default function InstructionDialog() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center cursor-pointer">
          <HelpCircle className=" h-4 w-4" />
          <span className="">Bantuan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-3xl w-full">
        <DialogHeader>
          <DialogTitle>Bantuan</DialogTitle>
          <DialogDescription>Silakan lihat instruksi penggunaan aplikasi dibawah ini.</DialogDescription>
        </DialogHeader>
        <div className="">
          <div className="relative aspect-video bg-black overflow-hidden">
            <iframe
              className="w-full h-full"
              src={"https://www.youtube.com/embed/njCZzt3Hcb4"}
              title={`Instruksi SIMPELANTAS`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="space-y-2 mt-4 text-sm">
            <p className="font-semibold">Langkah-langkah penyelesaian:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Lihat bukti pelanggaran berupa foto/video yang telah direkam</li>
              <li>Lihat detail pelanggaran dan pastikan kendaraan yang tercatat adalah kendaraan Anda</li>
              <li>
                Pilih salah satu metode penyelesaian:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Ajukan banding dengan mengunggah bukti pendukung</li>
                  <li>Bayar denda maksimal melalui pembayaran online</li>
                  <li>Bayar uanng titipan dan hadiri sidang sesuai jadwal yang ditentukan</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
        <DialogFooter>
          <Button variant="default" onClick={() => setIsOpen(false)} className="cursor-pointer">
            Mengerti
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
