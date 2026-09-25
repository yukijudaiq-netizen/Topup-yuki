import React, { useState } from 'react';
import { Order } from '../types';
import { getStoredOrders, formatRupiah } from '../utils/format';
import { X, Search, CheckCircle2, Clock, AlertCircle, Eye, ArrowRight } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrder: (order: Order) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  onSelectOrder,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const storedOrders = getStoredOrders();

  const filteredOrders = storedOrders.filter((order) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    return (
      order.orderId.toLowerCase().includes(q) ||
      order.userId.includes(q) ||
      order.whatsapp.includes(q) ||
      order.nickname.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900 p-5 sm:p-6 shadow-2xl text-neutral-100 max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              Cek Riwayat & Status Pesanan
            </h3>
            <p className="text-xs text-neutral-400">
              Lacak diamond Mobile Legends via No. Pesanan atau No. WhatsApp
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari No. Invoice (MLBB-...), ID Game, atau No. WA"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-2 text-xs text-neutral-400 hover:text-white cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* Orders list */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredOrders.length === 0 ? (
            <div className="py-10 text-center">
              <Clock className="mx-auto h-8 w-8 text-neutral-600 mb-2" />
              <p className="text-sm font-semibold text-neutral-300">Belum ada riwayat pesanan</p>
              <p className="text-xs text-neutral-500 mt-1">
                {searchQuery
                  ? 'Tidak ditemukan pesanan dengan kata kunci tersebut.'
                  : 'Pesanan top up yang Anda lakukan di perangkat ini akan muncul di sini.'}
              </p>
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.orderId}
                className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-3.5 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2 mb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">{ord.orderId}</span>
                  </div>
                  {ord.status === 'sukses' ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      SUKSES TERKIRIM
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                      <Clock className="h-3.5 w-3.5" />
                      MENUNGGU BAYAR
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300">
                  <div>
                    <span className="text-neutral-500 block">Akun Tujuan:</span>
                    <span className="font-medium text-white">
                      {ord.nickname} ({ord.userId})
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-neutral-500 block">Total Bayar:</span>
                    <span className="font-mono font-bold text-amber-300">
                      {formatRupiah(ord.totalPrice)}
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-500 block">Item:</span>
                    <span className="font-medium">{ord.product.name}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-neutral-500 block">Metode:</span>
                    <span>{ord.paymentMethod.name}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500">
                    {new Date(ord.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>

                  <button
                    onClick={() => {
                      onSelectOrder(ord);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 text-xs font-semibold text-amber-400 transition-colors cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Lihat Rincian</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
