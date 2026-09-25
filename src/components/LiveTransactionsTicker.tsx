import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const RECENT_ACTIVITIES = [
  { name: 'Aldi P.', id: '1289**** (2134)', item: '706 Diamonds', method: 'QRIS', time: 'Baru saja' },
  { name: 'Rehan F.', id: '5541**** (2089)', item: 'Weekly Diamond Pass', method: 'DANA', time: '12 detik lalu' },
  { name: 'Bagas K.', id: '9812**** (2411)', item: '257 Diamonds', method: 'GoPay', time: '28 detik lalu' },
  { name: 'Siti A.', id: '3341**** (2150)', item: 'Starlight Member Card', method: 'ShopeePay', time: '45 detik lalu' },
  { name: 'Fikri N.', id: '7120**** (2201)', item: '1050 Diamonds', method: 'BCA VA', time: '1 menit lalu' },
  { name: 'Dimas W.', id: '8912**** (2178)', item: 'Weekly Diamond Pass x2', method: 'QRIS', time: '1 menit lalu' },
  { name: 'Putri R.', id: '4451**** (2004)', item: '86 Diamonds', method: 'OVO', time: '2 menit lalu' },
];

export const LiveTransactionsTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = RECENT_ACTIVITIES[currentIndex];

  return (
    <div className="border-b border-neutral-800/80 bg-neutral-900/60 py-2.5 px-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-neutral-400 shrink-0">Live Transaksi:</span>
          <div className="flex items-center gap-1.5 truncate text-neutral-300">
            <span className="font-medium text-white">{current.name}</span>
            <span className="text-neutral-500 font-mono">[{current.id}]</span>
            <span className="text-neutral-400">membeli</span>
            <span className="font-semibold text-amber-400">{current.item}</span>
            <span className="hidden sm:inline text-neutral-400">via {current.method}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">{current.time}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 text-neutral-400 shrink-0">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span className="text-[11px] font-medium">Auto Injection Moonton API Aktif</span>
          </span>
        </div>
      </div>
    </div>
  );
};
