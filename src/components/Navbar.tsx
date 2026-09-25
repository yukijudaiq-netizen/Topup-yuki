import React from 'react';
import { Search, ShieldCheck, MessageCircle, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onOpenTracker: () => void;
  onOpenGuide: () => void;
  recentOrdersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTracker,
  onOpenGuide,
  recentOrdersCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single clean text element wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 font-display text-lg font-extrabold text-neutral-950 shadow-sm shadow-amber-500/20">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold uppercase tracking-wider text-white">
              Mythic<span className="text-amber-400">Topup</span>
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <a
            href="#topup-section"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            Top Up MLBB
          </a>
          <button
            onClick={onOpenGuide}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Panduan ID Game
          </button>
          <a
            href="#testimoni-section"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            Testimoni
          </a>
          <a
            href="#faq-section"
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            FAQ & Bantuan
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onOpenTracker}
            className="relative flex items-center gap-2 rounded-lg border border-neutral-700/80 bg-neutral-900/90 px-3.5 py-2 text-xs font-semibold text-neutral-200 shadow-sm hover:border-amber-500/50 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            <Search className="h-3.5 w-3.5 text-amber-400" />
            <span>Cek Pesanan</span>
            {recentOrdersCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-neutral-950">
                {recentOrdersCount}
              </span>
            )}
          </button>

          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20MythicTopup%2C%20saya%20butuh%20bantuan%20top%20up%20MLBB"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors whitespace-nowrap"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>CS 24 Jam</span>
          </a>
        </div>
      </div>
    </header>
  );
};
