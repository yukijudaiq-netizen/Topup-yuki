import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { formatRupiah, updateOrderStatusInStorage } from '../utils/format';
import {
  X,
  Clock,
  Copy,
  Check,
  ShieldCheck,
  Download,
  CheckCircle2,
  Share2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Printer,
} from 'lucide-react';

interface PaymentModalProps {
  order: Order | null;
  onClose: () => void;
  onOrderUpdated: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  order,
  onClose,
  onOrderUpdated,
}) => {
  if (!order) return null;

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60); // 15 mins
  const [paymentStatus, setPaymentStatus] = useState<OrderStatus>(order.status);
  const [processingStep, setProcessingStep] = useState<string | null>(null);

  // Sync internal state if order changes
  useEffect(() => {
    setPaymentStatus(order.status);
    setSecondsRemaining(15 * 60);
    setProcessingStep(null);
  }, [order.orderId]);

  // Countdown timer
  useEffect(() => {
    if (paymentStatus === 'sukses') return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [paymentStatus]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Simulate payment verification flow
  const handleCheckPayment = () => {
    setProcessingStep('Menghubungkan ke gateway pembayaran & mutasi...');

    setTimeout(() => {
      setProcessingStep('Pembayaran diverifikasi! Mengirim diamond ke server Moonton...');
      setTimeout(() => {
        setProcessingStep('Selesai! Diamond berhasil masuk ke mailbox game.');
        setTimeout(() => {
          setPaymentStatus('sukses');
          updateOrderStatusInStorage(order.orderId, 'sukses');
          onOrderUpdated();
          setProcessingStep(null);
        }, 800);
      }, 1200);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl text-neutral-100 my-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-base font-bold text-white tracking-wide">
              {paymentStatus === 'sukses' ? 'Bukti Pembayaran Resmi' : 'Instruksi Pembayaran'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {paymentStatus === 'sukses' ? (
          /* ================= SUCCESS SCREEN / DIGITAL INVOICE ================= */
          <div className="p-6">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-10 w-10 animate-in zoom-in-75 duration-200" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-white">
                Transaksi Berhasil!
              </h3>
              <p className="mt-1 text-xs text-neutral-400">
                Diamond telah otomatis masuk ke akun Mobile Legends Anda
              </p>
            </div>

            {/* Official Digital Invoice Card */}
            <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950 p-4.5 space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-neutral-800/80 pb-2.5">
                <span className="text-neutral-400">No. Invoice:</span>
                <span className="font-mono font-bold text-amber-400">{order.orderId}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Status Pengiriman:</span>
                <span className="flex items-center gap-1 font-semibold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  DIAMOND TERKIRIM (SUKSES)
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-400">User ID & Server:</span>
                <span className="font-mono font-medium text-white">
                  {order.userId} ({order.zoneId})
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Nickname Akun:</span>
                <span className="font-bold text-white">{order.nickname}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Item Produk:</span>
                <span className="font-medium text-amber-300">{order.product.name}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Metode Pembayaran:</span>
                <span className="text-white">{order.paymentMethod.name}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Waktu Pembayaran:</span>
                <span className="font-mono text-neutral-300">
                  {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
                </span>
              </div>

              <div className="flex justify-between items-center border-t border-neutral-800/80 pt-2.5">
                <span className="text-sm font-bold text-white">Total Dibayar:</span>
                <span className="font-display text-lg font-bold text-emerald-400 font-mono tabular-nums">
                  {formatRupiah(order.totalPrice)}
                </span>
              </div>
            </div>

            {/* Next Steps tips */}
            <div className="mt-4 rounded-lg bg-neutral-950/60 border border-neutral-800 p-3 text-[11px] text-neutral-400">
              <strong className="text-neutral-300">Langkah Selanjutnya:</strong> Silakan buka atau restart game Mobile Legends kamu, cek jumlah diamond atau cek tab Mailbox di dalam game.
            </div>

            {/* Action buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  copyToClipboard(
                    `*BUKTI TOP UP MLBB*\nNo: ${order.orderId}\nAkun: ${order.nickname} (${order.userId})\nItem: ${order.product.name}\nTotal: ${formatRupiah(order.totalPrice)}\nStatus: SUKSES`,
                    'receipt'
                  )
                }
                className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800 py-3 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                {copiedField === 'receipt' ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-amber-400" />
                    <span>Salin Rincian</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-xs font-bold text-neutral-950 shadow-md hover:from-amber-300 hover:to-amber-400 transition-colors cursor-pointer"
              >
                <span>Top Up Lagi</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          /* ================= ACTIVE PAYMENT GATEWAY ================= */
          <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Top Alert & Expiry Countdown */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5">
              <div className="flex items-center gap-2 text-xs text-amber-300">
                <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Selesaikan pembayaran dalam:</span>
              </div>
              <span className="font-mono text-sm font-bold text-amber-400 tracking-wider">
                {timeString}
              </span>
            </div>

            {/* Recipient summary */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">No. Pesanan:</span>
                <div className="flex items-center gap-1.5 font-mono text-white">
                  <span>{order.orderId}</span>
                  <button
                    onClick={() => copyToClipboard(order.orderId, 'orderId')}
                    className="text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    {copiedField === 'orderId' ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Tujuan Top Up:</span>
                <span className="font-bold text-amber-300">
                  {order.nickname} · {order.userId} ({order.zoneId})
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Item:</span>
                <span className="font-medium text-white">{order.product.name}</span>
              </div>

              <div className="flex justify-between border-t border-neutral-800 pt-2">
                <span className="text-neutral-400">Total Pembayaran:</span>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-bold text-amber-400 font-mono tabular-nums">
                    {formatRupiah(order.totalPrice)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(String(order.totalPrice), 'totalPrice')}
                    className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium text-neutral-300 hover:bg-neutral-700 cursor-pointer"
                  >
                    {copiedField === 'totalPrice' ? 'Tersalin' : 'Salin'}
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Specific Interface */}
            {order.paymentMethod.category === 'qris' && (
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 text-center">
                <div className="inline-block rounded-xl bg-white p-3 shadow-lg">
                  {/* Real visual QR Code matrix simulation with Indonesian QRIS header */}
                  <div className="flex items-center justify-between border-b border-neutral-300 pb-1 mb-2 px-1">
                    <span className="text-[10px] font-extrabold tracking-widest text-neutral-900">
                      QRIS
                    </span>
                    <span className="text-[9px] font-medium text-neutral-600">
                      GPN & BI STANDAR
                    </span>
                  </div>

                  {/* SVG QR Code */}
                  <svg className="h-44 w-44 mx-auto" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="white" />
                    {/* Corner Position Mark 1 */}
                    <rect x="5" y="5" width="26" height="26" fill="black" />
                    <rect x="8" y="8" width="20" height="20" fill="white" />
                    <rect x="11" y="11" width="14" height="14" fill="black" />

                    {/* Corner Position Mark 2 */}
                    <rect x="69" y="5" width="26" height="26" fill="black" />
                    <rect x="72" y="8" width="20" height="20" fill="white" />
                    <rect x="75" y="11" width="14" height="14" fill="black" />

                    {/* Corner Position Mark 3 */}
                    <rect x="5" y="69" width="26" height="26" fill="black" />
                    <rect x="8" y="72" width="20" height="20" fill="white" />
                    <rect x="11" y="75" width="14" height="14" fill="black" />

                    {/* Pattern matrices */}
                    <rect x="35" y="8" width="6" height="6" fill="black" />
                    <rect x="45" y="12" width="8" height="6" fill="black" />
                    <rect x="57" y="6" width="6" height="8" fill="black" />
                    <rect x="35" y="24" width="8" height="8" fill="black" />
                    <rect x="48" y="24" width="12" height="6" fill="black" />

                    <rect x="8" y="36" width="6" height="8" fill="black" />
                    <rect x="20" y="38" width="8" height="6" fill="black" />
                    <rect x="35" y="36" width="10" height="10" fill="black" />
                    <rect x="50" y="36" width="8" height="8" fill="black" />
                    <rect x="65" y="38" width="6" height="8" fill="black" />
                    <rect x="78" y="36" width="14" height="6" fill="black" />

                    <rect x="36" y="52" width="8" height="6" fill="black" />
                    <rect x="50" y="50" width="12" height="8" fill="black" />
                    <rect x="70" y="52" width="8" height="6" fill="black" />
                    <rect x="84" y="50" width="8" height="12" fill="black" />

                    <rect x="36" y="68" width="10" height="6" fill="black" />
                    <rect x="52" y="66" width="8" height="10" fill="black" />
                    <rect x="68" y="68" width="10" height="8" fill="black" />
                    <rect x="82" y="70" width="10" height="8" fill="black" />

                    <rect x="36" y="82" width="14" height="8" fill="black" />
                    <rect x="56" y="80" width="8" height="12" fill="black" />
                    <rect x="70" y="84" width="12" height="8" fill="black" />
                    <rect x="86" y="82" width="8" height="10" fill="black" />

                    {/* Center badge */}
                    <rect x="42" y="42" width="16" height="16" fill="black" rx="2" />
                    <text x="50" y="53" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
                      M
                    </text>
                  </svg>

                  <p className="mt-2 text-[10px] text-neutral-600 font-semibold">
                    NMID: ID1020084920491
                  </p>
                </div>

                <div className="mt-4 text-xs text-neutral-400 space-y-1">
                  <p>Buka aplikasi BCA, Mandiri, Dana, GoPay, OVO, atau ShopeePay</p>
                  <p className="text-neutral-500 text-[11px]">
                    Scan QRIS di atas untuk menyelesaikan pembayaran otomatis.
                  </p>
                </div>
              </div>
            )}

            {order.paymentMethod.category === 'va' && (
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Nomor Virtual Account:</span>
                  <span className="text-xs font-semibold text-cyan-400">{order.paymentMethod.name}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900 p-3.5">
                  <span className="font-mono text-lg font-bold text-white tracking-wider">
                    {order.vaNumber || '807779482019482'}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(order.vaNumber || '807779482019482', 'vaNumber')
                    }
                    className="inline-flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-neutral-950 hover:bg-amber-400 cursor-pointer"
                  >
                    {copiedField === 'vaNumber' ? 'Tersalin!' : 'Salin VA'}
                  </button>
                </div>

                <div className="text-[11px] text-neutral-400 space-y-1 pt-2">
                  <p>1. Masuk ke aplikasi m-Banking atau ATM Bank Anda.</p>
                  <p>2. Pilih menu <strong>Transfer / Bayar &gt; Virtual Account</strong>.</p>
                  <p>3. Masukkan nomor VA di atas dan konfirmasi pembayaran sesuai total nominal.</p>
                </div>
              </div>
            )}

            {order.paymentMethod.category === 'retail' && (
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Kode Pembayaran Gerai:</span>
                  <span className="text-xs font-semibold text-amber-400">{order.paymentMethod.name}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900 p-3.5">
                  <span className="font-mono text-xl font-bold text-white tracking-widest">
                    {order.orderId.replace(/[^0-9]/g, '').slice(-8)}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(order.orderId.replace(/[^0-9]/g, '').slice(-8), 'retailCode')
                    }
                    className="inline-flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-neutral-950 hover:bg-amber-400 cursor-pointer"
                  >
                    {copiedField === 'retailCode' ? 'Tersalin!' : 'Salin Kode'}
                  </button>
                </div>

                <p className="text-[11px] text-neutral-400">
                  Tunjukkan kode pembayaran ini ke kasir {order.paymentMethod.name} dan lakukan pembayaran tunai.
                </p>
              </div>
            )}

            {order.paymentMethod.category === 'ewallet' && (
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-center space-y-2">
                <p className="text-xs text-neutral-300">
                  Pembayaran akan diproses via aplikasi <strong>{order.paymentMethod.name}</strong>.
                </p>
                <p className="text-[11px] text-neutral-400">
                  Notifikasi konfirmasi pembayaran telah dikirim ke nomor WhatsApp Anda.
                </p>
              </div>
            )}

            {order.paymentMethod.category === 'pulsa' && (
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-center space-y-2">
                <p className="text-xs text-neutral-300">
                  Pastikan pulsa kartu <strong>{order.paymentMethod.name}</strong> Anda mencukupi nominal{' '}
                  <strong className="text-amber-400">{formatRupiah(order.totalPrice)}</strong>.
                </p>
                <p className="text-[11px] text-neutral-400">
                  Sistem kami akan mengirimkan SMS konfirmasi potong pulsa otomatis.
                </p>
              </div>
            )}

            {/* Processing banner if checking */}
            {processingStep && (
              <div className="rounded-xl border border-cyan-800/80 bg-cyan-950/40 p-3.5 flex items-center gap-3">
                <RefreshCw className="h-5 w-5 animate-spin text-cyan-400 shrink-0" />
                <span className="text-xs text-cyan-200 font-medium">{processingStep}</span>
              </div>
            )}

            {/* Check Payment action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCheckPayment}
                disabled={!!processingStep}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-3.5 text-center font-display text-sm font-bold text-white shadow-lg hover:from-emerald-400 hover:to-emerald-500 transition-all cursor-pointer active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {processingStep ? 'Sedang Memverifikasi...' : 'Saya Sudah Bayar (Cek Status)'}
                </span>
              </button>
              <p className="mt-2 text-center text-[11px] text-neutral-500">
                Tekan tombol di atas setelah transfer berhasil untuk trigger inject diamond instan.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
