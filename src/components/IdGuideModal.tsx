import React from 'react';
import { X, CheckCircle, Info, Copy } from 'lucide-react';

interface IdGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSampleId?: (userId: string, zoneId: string) => void;
}

export const IdGuideModal: React.FC<IdGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSampleId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl text-neutral-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              Cara Mengetahui User ID & Zone ID
            </h3>
            <p className="text-xs text-neutral-400">
              Panduan akun resmi Mobile Legends: Bang Bang
            </p>
          </div>
        </div>

        {/* Visual Graphic Representation of Profile Screen */}
        <div className="mt-5 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
          <div className="text-xs font-semibold text-neutral-400 mb-2">Simulasi Tampilan Profil Game:</div>
          <div className="rounded-lg border border-neutral-700/60 bg-gradient-to-r from-neutral-900 to-neutral-950 p-4">
            <div className="flex items-center gap-3">
              {/* Avatar circle */}
              <div className="h-12 w-12 rounded-full border-2 border-amber-500 bg-gradient-to-tr from-amber-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                ML
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">xSlayer~MLBB</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-mono">
                    Lv. 98
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="text-neutral-400">ID:</span>
                  {/* Highlighted User ID */}
                  <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-mono font-bold text-cyan-300 border border-cyan-500/40">
                    12345678
                  </span>
                  {/* Highlighted Zone ID */}
                  <span className="rounded bg-amber-500/20 px-1.5 py-0.5 font-mono font-bold text-amber-300 border border-amber-500/40">
                    (2134)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-neutral-800">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span>Kotak Biru: <strong>User ID</strong> (8-10 digit)</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>Kotak Emas: <strong>Zone ID</strong> (4-5 digit)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-step instructions */}
        <div className="mt-5 space-y-3 text-xs text-neutral-300">
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-[11px] font-bold text-amber-400">
              1
            </span>
            <p>Buka aplikasi game <strong className="text-white">Mobile Legends</strong> di ponsel Anda.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-[11px] font-bold text-amber-400">
              2
            </span>
            <p>Klik ikon <strong className="text-white">Avatar / Foto Profil</strong> akun Anda di pojok kiri atas layar utama.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-[11px] font-bold text-amber-400">
              3
            </span>
            <p>
              Pada tab menu <strong className="text-white">Basic Info</strong>, lihat di bawah nama karakter Anda. User ID adalah angka sebelum tanda kurung, dan Zone ID adalah angka di dalam tanda kurung.
            </p>
          </div>
        </div>

        {/* Quick action / Try with sample account */}
        {onSelectSampleId && (
          <div className="mt-6 border-t border-neutral-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-neutral-400">Ingin coba langsung?</span>
            <button
              onClick={() => {
                onSelectSampleId('12345678', '2134');
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3.5 py-2 text-xs font-semibold text-amber-300 transition-colors cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Gunakan Akun Simulasi (12345678 - 2134)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
