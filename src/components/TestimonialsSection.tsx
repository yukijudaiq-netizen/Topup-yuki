import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Fauzan Akbar',
    role: 'Mythical Immortal · Main Assassin',
    item: 'Weekly Diamond Pass',
    comment:
      'Gila cepet banget, bayar pakai QRIS BCA gak sampe 3 detik diamond langsung pop up di in-game notification. Harganya lebih murah daripada di dalam game.',
    date: '20 September 2026',
    rating: 5,
  },
  {
    name: 'Kevin Jonathan',
    role: 'Mythical Glory · Squad Captain',
    item: '706 Diamonds',
    comment:
      'Lagi butuh diamond mepet buat gacha skin aspiran, top up di sini langsung masuk tanpa ribet login akun moonton. 100% aman dan legal.',
    date: '18 September 2026',
    rating: 5,
  },
  {
    name: 'Annisa Putri',
    role: 'Mythic Honor · Support Roamer',
    item: 'Starlight Member Card',
    comment:
      'Udah langganan starlight tiap awal bulan di MythicTopup. Customer servicenya juga responsif banget pas kemarin nanya kode voucher.',
    date: '15 September 2026',
    rating: 5,
  },
  {
    name: 'Rian Pratama',
    role: 'Mythical Glory · Gold Laner',
    item: '2195 Diamonds (Collector)',
    comment:
      'Awalnya ragu top up nominal gede, tapi pas dicoba invoice resmi langsung dikirim ke WhatsApp dan diamond masuk rapi. Recommended buat anak ML!',
    date: '12 September 2026',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimoni-section" className="py-14 border-t border-neutral-800/60 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400">
            <span>Ulasan Komunitas Pemain</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Rating Rata-rata 4.9 / 5.0</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>85.000+ Transaksi Sukses</span>
          </div>

          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Dipercaya Ribuan Player Mobile Legends
          </h2>

          <p className="mt-2 text-sm text-neutral-400">
            Lihat pengalaman nyata pemain MLBB yang telah melakukan top up diamond dan pass harian secara instan.
          </p>
        </div>

        {/* Testimonials Bento/Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-xs">{t.name}</span>
                  <span className="text-[10px] text-amber-400 font-mono font-medium">
                    {t.item}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-1">
                  <span>{t.role}</span>
                  <span>{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
