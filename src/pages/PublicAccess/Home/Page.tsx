import { FlipWords } from "@/components/ui/flip-words";
import CheckTicketForm from "./check-ticket-form";
import { AlertCircle, CreditCard, FileCheck, Ticket, Scale, Upload } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div id="check-ticket" className="relative md:px-40 px-4 pt-20 pb-16 min-h-screen">
        <img src="/hero-bg.jpeg" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="items-center text-center space-y-6 mb-14">
            <h1 className="text-6xl font-bold text-primary flex justify-center items-center">
              <div className="hidden md:block">
                <FlipWords words={["Cek", "Konfirmasi", "Bayar"]} duration={1000} className="text-primary" />
              </div>
              <div className="md:hidden mr-4">Cek</div>
              <span className="-ms-2">Tilang</span>
            </h1>
            <p className="text-zinc-800 max-w-2xl mx-auto text-lg">Cek surat tilang Anda dengan mudah dan cepat! Masukkan nomor tilang dan nomor kendaraan untuk melihat detail pelanggaran, melakukan pembayaran denda secara online.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <CheckTicketForm />
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-40">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl font-bold text-center text-zinc-800 mb-12">
            Layanan Kami
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Ticket className="w-6 h-6 text-primary" />,
                title: "Cek Tilang Online",
                description: "Cek status tilang Anda secara online dengan mudah dan cepat menggunakan nomor tilang atau nomor kendaraan.",
              },
              {
                icon: <FileCheck className="w-6 h-6 text-primary" />,
                title: "Bayar Tilang Online",
                description: "Lakukan pembayaran denda tilang secara online dengan berbagai metode pembayaran yang tersedia.",
              },
              {
                icon: <AlertCircle className="w-6 h-6 text-primary" />,
                title: "Pengaduan",
                description: "Laporkan keluhan atau saran Anda terkait layanan lalu lintas untuk perbaikan pelayanan.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-zinc-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-40">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl font-bold text-center text-zinc-800 mb-12">
            3 Pilihan Penyelesaian
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <CreditCard className="w-6 h-6 text-primary" />,
                title: "Bayar Denda Maksimal",
                description: "Selesaikan tilang dengan cepat melalui pembayaran denda maksimal secara online. Tidak perlu menghadiri sidang.",
              },
              {
                icon: <Upload className="w-6 h-6 text-primary" />,
                title: "Unggah Bukti Banding",
                description: "Ajukan banding dengan mengunggah bukti-bukti pendukung. Petugas akan meninjau membuat keputusan yang sesuai.",
              },
              {
                icon: <Scale className="w-6 h-6 text-primary" />,
                title: "Hadir Persidangan",
                description: "Hadiri sidang untuk memberikan pembelaan langsung di pengadilan. Jadwal dan lokasi sidang akan diinformasikan.",
              },
            ].map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">{option.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-zinc-600">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Section */}
      {/* <div className="py-20 bg-zinc-50">
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
      </div> */}

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "100K+", text: "Tilang Diproses" },
              { number: "50K+", text: "Pengguna Aktif" },
              { number: "24/7", text: "Layanan Online" },
            ].map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.2 }}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-zinc-600">{stat.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
