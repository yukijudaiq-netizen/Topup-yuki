import React from 'react';
import { ShieldCheck, MessageCircle } from 'lucide-react';

interface FooterProps {
  onOpenGuide: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuide, onOpenTracker }) => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 font-display text-base font-extrabold text-neutral-950">
                M
              </div>
              <span className="font-display text-xl font-bold uppercase tracking-wider text-white">
                Mythic<span className="text-amber-400">Topup</span>
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed max-w-md text-xs">
              Platform top up game Mobile Legends: Bang Bang via User ID & Server Zone resmi, cepat, dan terpercaya di Indonesia. Otomatis masuk 1–3 detik dengan sistem keamanan garansi anti-banned.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-medium pt-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Sertifikasi Enkripsi Transaksi 256-bit SSL</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#topup-section" className="hover:text-amber-400 transition-colors">
                  Top Up Diamond
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Lacak Pesanan / Cek Transaksi
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGuide}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Panduan Menemukan User ID
                </button>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-amber-400 transition-colors">
                  Pertanyaan Umum (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service Contact */}
          <div className="space-y-2.5">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Layanan Pelanggan
            </h4>
            <p className="text-neutral-400 text-xs">
              Tim dukungan kami siap melayani Anda 24 jam nonstop setiap hari.
            </p>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20MythicTopup%2C%20saya%20butuh%20bantuan%20terkait%20pesanan%20MLBB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors mt-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat WhatsApp Customer Care</span>
            </a>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="border-t border-neutral-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>
            © {new Date().getFullYear()} MythicTopup MLBB. Seluruh hak cipta dilindungi undang-undang.
          </p>
          <p className="text-center sm:text-right max-w-lg">
            Mobile Legends: Bang Bang dan logo terkait merupakan merek dagang terdaftar dari Moonton Games. Situs ini beroperasi sebagai mitra distribusi voucher pihak ketiga independen.
          </p>
        </div>
      </div>
    </footer>
  );
};
