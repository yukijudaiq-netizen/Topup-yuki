import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Apakah top up via User ID dan Zone ID ini aman dan legal?',
    answer:
      'Sangat aman dan 100% legal resmi. Kami menggunakan jalur API resmi distributor Moonton. Kami TIDAK PERNAH meminta email, password, maupun kode OTP akun Moonton Anda. Akun Anda bebas dari risiko banned maupun phising.',
  },
  {
    question: 'Berapa lama proses diamond masuk ke akun game setelah bayar?',
    answer:
      'Sistem injeksi kami bekerja secara otomatis 24 jam nonstop. Setelah pembayaran terverifikasi, diamond dan item pass langsung masuk dalam waktu 1 hingga 3 detik. Anda cukup merefresh atau membuka game Mobile Legends Anda.',
  },
  {
    question: 'Berapa batas maksimal langganan Weekly Diamond Pass?',
    answer:
      'Anda dapat membeli Weekly Diamond Pass beberapa kali sekaligus hingga batas maksimal penumpukan (stacking) 10 minggu (70 hari). Diamond harian akan otomatis diklaim setiap hari di dalam event game.',
  },
  {
    question: 'Bagaimana jika saya salah mengetikkan User ID atau Server?',
    answer:
      'Sistem kami menyediakan tombol "Cek Nick" di Langkah 1 untuk memastikan nama akun Anda sesuai sebelum bayar. Jika Anda terlanjur salah memasukkan nomor akun dan diamond belum terproses, silakan segera hubungi Customer Service 24 Jam kami melalui WhatsApp dengan melampirkan No. Invoice.',
  },
  {
    question: 'Metode pembayaran apa saja yang bebas biaya admin (Rp 0)?',
    answer:
      'Metode pembayaran QRIS Realtime dapat digunakan melalui seluruh aplikasi perbankan (BCA, Mandiri, BRI, BNI, Danamon) dan e-wallet (DANA, GoPay, ShopeePay, OVO) dengan biaya layanan admin Rp 0 (Gratis).',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-14 border-t border-neutral-800/60 bg-neutral-900/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400">
            <span>Bantuan & Dukungan Pelanggan</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>24 Jam Siaga</span>
          </div>

          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Pertanyaan yang Sering Diajukan
          </h2>

          <p className="mt-2 text-sm text-neutral-400">
            Semua yang perlu Anda ketahui mengenai keamanan, pengiriman diamond, dan metode bayar.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-neutral-800 bg-neutral-900/90 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-4.5 text-left text-sm font-semibold text-white hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4.5 pb-4.5 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
