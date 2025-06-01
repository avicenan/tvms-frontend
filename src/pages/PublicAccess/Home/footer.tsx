import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-zinc-900">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-12 pb-16">
          {/* About Section */}
          <div className="flex flex-col gap-4">
            <div className="text-xl text-white font-bold mb-4">Tentang Kami</div>
            <div className="text-zinc-400 text-sm">Satuan Lalu Lintas Polri adalah unit pelaksana teknis Kepolisian Negara yang bertugas menyelenggarakan fungsi lalu lintas.</div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="text-zinc-300 hover:text-white cursor-pointer transition-colors">Profil Satlantas</div>
              <div className="text-zinc-300 hover:text-white cursor-pointer transition-colors">Visi & Misi</div>
              <div className="text-zinc-300 hover:text-white cursor-pointer transition-colors">Struktur Organisasi</div>
              <div className="text-zinc-300 hover:text-white cursor-pointer transition-colors">Berita & Pengumuman</div>
            </div>
          </div>

          {/* Services Section */}
          <div className="flex flex-col gap-4">
            <div className="text-xl text-white font-bold mb-4">Layanan</div>
            <div className="flex flex-col gap-2">
              <div className="text-zinc-300 hover:text-white cursor-pointer transition-colors">Cek Tilang Online</div>
              <div className="text-zinc-300 hover:text-white cursor-pointer transition-colors">Bayar Tilang</div>
              <div className="text-zinc-300 hover:text-white cursor-pointer transition-colors">Pengaduan</div>
              <div className="text-zinc-300 hover:text-white cursor-pointer transition-colors">Bantuan</div>
              <div className="text-zinc-300 hover:text-white cursor-pointer transition-colors">FAQ</div>
              <div className="text-zinc-300 hover:text-white cursor-pointer transition-colors">Regulasi</div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-4">
            <div className="text-xl text-white font-bold mb-4">Kontak</div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-zinc-300">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Jl. Contoh No. 123, Jakarta</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Phone className="w-5 h-5 text-primary" />
                <span>(021) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@etilang.web.id</span>
              </div>
              <div className="text-zinc-300 mt-2">
                Jam Operasional:
                <br />
                Senin - Jumat: 08:00 - 16:00
                <br />
                Sabtu: 08:00 - 12:00
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col gap-4">
            <div className="text-xl text-white font-bold mb-4">Media Sosial</div>
            <div className="flex flex-col gap-4">
              <div className="text-zinc-300 mb-2">Ikuti kami di media sosial untuk informasi terbaru</div>
              <div className="flex gap-4">
                <a href="#" className="text-zinc-300 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-zinc-300 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-zinc-300 hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-zinc-300 hover:text-white transition-colors">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
              <div className="mt-4">
                <div className="text-zinc-300 text-sm">Download Aplikasi Mobile</div>
                <div className="flex gap-2 mt-2">
                  <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">Play Store</button>
                  <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">App Store</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-zinc-400 text-sm text-center md:text-left">© 2024 Satuan Lalu Lintas. Hak Cipta Dilindungi.</div>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Kebijakan Privasi
                </a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Syarat & Ketentuan
                </a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Peta Situs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
