import React from 'react';
import { Zap, ShieldCheck, Clock, CreditCard, Sparkles, HelpCircle } from 'lucide-react';

interface HeroProps {
  onOpenGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenGuide }) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800/60 bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950 pt-8 pb-12 sm:pt-14 sm:pb-16">
      {/* Background ambient glow effects */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-32 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/4 -left-32 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Value proposition */}
          <div className="lg:col-span-7">
            {/* Trust kicker metadata without pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-amber-400">
              <span>Layanan Resmi Top Up MLBB</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>100% Legal Moonton</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Tanpa Login Password</span>
            </div>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-5xl lg:leading-[1.15] text-balance font-display">
              Top Up Mobile Legends: Bang Bang <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Via Akun Sendiri Tercepat
              </span>
            </h1>

            <p className="mt-4 text-base text-neutral-300 sm:text-lg max-w-2xl leading-relaxed">
              Cukup masukkan <strong className="text-white">User ID</strong> dan{' '}
              <strong className="text-white">Zone ID</strong> akun Mobile Legends kamu. Diamond & Weekly Diamond Pass otomatis masuk dalam hitungan 1–3 detik, garansi aman anti banned 24 jam nonstop.
            </p>

            {/* Quick Proof Metrics - claim to proof adjacency */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-200">
                <Zap className="h-4 w-4 text-amber-400 shrink-0" />
                <span>1-3 Detik Otomatis</span>
              </span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="flex items-center gap-1.5 text-neutral-200">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Garansi Anti Banned</span>
              </span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="flex items-center gap-1.5 text-neutral-200">
                <Clock className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>24/7 Server Siaga</span>
              </span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="flex items-center gap-1.5 text-neutral-200">
                <CreditCard className="h-4 w-4 text-amber-400 shrink-0" />
                <span>QRIS 0% Admin</span>
              </span>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#topup-section"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-500/25 hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <Sparkles className="mr-2 h-4 w-4 text-neutral-950" />
                <span>Beli Diamond Sekarang</span>
              </a>

              <button
                onClick={onOpenGuide}
                className="inline-flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900/90 px-5 py-3.5 text-sm font-semibold text-neutral-200 hover:border-neutral-500 hover:bg-neutral-800 hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                <HelpCircle className="mr-2 h-4 w-4 text-amber-400" />
                <span>Cara Cek ID Akun</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/95 via-neutral-900/80 to-neutral-950 p-6 shadow-2xl shadow-black/80 backdrop-blur-sm">
              {/* Top Card Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-cyan-500 p-0.5 shadow-md">
                    <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-neutral-950">
                      {/* Stylized Diamond Icon */}
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-cyan-400 fill-cyan-400/20"
                        stroke="currentColor"
                        strokeWidth="1.75"
                      >
                        <polygon points="12,2 22,8.5 12,22 2,8.5" />
                        <polyline points="2,8.5 12,13 22,8.5" />
                        <line x1="12" y1="2" x2="12" y2="13" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white tracking-wide">
                      Mobile Legends: Bang Bang
                    </h3>
                    <p className="text-xs text-neutral-400">Moonton Official Partner Distribution</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 justify-end">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">1.8s avg delivery</span>
                </div>
              </div>

              {/* Showcase Grid Features */}
              <div className="mt-5 space-y-3.5">
                <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950/80 border border-cyan-800/50 text-cyan-300">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-200">Metode Input Langsung</p>
                      <p className="text-[11px] text-neutral-400">Hanya User ID (Server Zone)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-neutral-300 font-mono">100% Aman</span>
                </div>

                <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-900/50 border border-amber-700/50 text-amber-300">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-amber-200">Weekly Diamond Pass</p>
                      <p className="text-[11px] text-neutral-400">Total 450 Diamond + Starlight XP</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400 font-mono">Rp 27.500</span>
                </div>

                <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-950/80 border border-indigo-800/50 text-indigo-300">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-200">Metode Pembayaran</p>
                      <p className="text-[11px] text-neutral-400">QRIS, BCA, Dana, GoPay, ShopeePay</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 font-mono">Instan</span>
                </div>
              </div>

              {/* Bottom Card Footer info */}
              <div className="mt-5 border-t border-neutral-800/80 pt-3 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Dipercaya 85.000+ Gamers MLBB</span>
                <span className="font-semibold text-amber-400">Rating 4.9/5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
