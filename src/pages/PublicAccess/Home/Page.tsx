import { FlipWords } from "@/components/ui/flip-words";
import CheckTicketForm from "./check-ticket-form";
import { AlertCircle, Clock, FileCheck, Shield, Ticket } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="md:px-40 px-4 pt-20 pb-16 bg-gradient-to-b from-background to-zinc-50/50">
        <div className="mx-auto max-w-7xl">
          <div className="items-center text-center space-y-6 mb-14">
            <h1 className="text-6xl font-bold text-primary flex justify-center items-center">
              <div className="hidden md:block">
                <FlipWords words={["Cek", "Konfirmasi", "Bayar"]} duration={1000} className="text-primary" />
              </div>
              <div className="md:hidden mr-4">Cek</div>
              <span className="-ms-2">Tilang</span>
            </h1>
            <p className="text-zinc-600 max-w-2xl mx-auto text-lg">Cek status tilang Anda dengan mudah dan cepat! Masukkan nomor tilang dan nomor kendaraan untuk melihat detail pelanggaran, melakukan pembayaran denda secara online.</p>
          </div>
          <CheckTicketForm />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-40">
          <h2 className="text-3xl font-bold text-center text-zinc-800 mb-12">Layanan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Ticket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cek Tilang Online</h3>
              <p className="text-zinc-600">Cek status tilang Anda secara online dengan mudah dan cepat menggunakan nomor tilang atau nomor kendaraan.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bayar Tilang Online</h3>
              <p className="text-zinc-600">Lakukan pembayaran denda tilang secara online dengan berbagai metode pembayaran yang tersedia.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pengaduan</h3>
              <p className="text-zinc-600">Laporkan keluhan atau saran Anda terkait layanan lalu lintas untuk perbaikan pelayanan.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-40">
          <h2 className="text-3xl font-bold text-center text-zinc-800 mb-12">Informasi Penting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 bg-white rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Jam Operasional</h3>
                <p className="text-zinc-600">
                  Senin - Jumat: 08:00 - 16:00
                  <br />
                  Sabtu: 08:00 - 12:00
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Keamanan Data</h3>
                <p className="text-zinc-600">Data Anda dilindungi dengan sistem keamanan berstandar tinggi sesuai dengan peraturan yang berlaku.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100K+</div>
              <div className="text-zinc-600">Tilang Diproses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-zinc-600">Pengguna Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-zinc-600">Layanan Online</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
