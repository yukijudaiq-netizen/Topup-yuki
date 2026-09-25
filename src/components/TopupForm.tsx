import React, { useState, useMemo } from 'react';
import {
  ProductItem,
  PaymentMethod,
  PromoVoucher,
  PlayerAccount,
  ProductCategory,
  PaymentCategory,
} from '../types';
import { MLBB_PRODUCTS, PROMO_VOUCHERS, MOCK_ACCOUNTS } from '../data/products';
import { PAYMENT_METHODS } from '../data/paymentMethods';
import { formatRupiah } from '../utils/format';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Tag,
  CreditCard,
  QrCode,
  Wallet,
  Building2,
  Store,
  PhoneCall,
  ChevronRight,
  HelpCircle,
  Check,
} from 'lucide-react';

interface TopupFormProps {
  onOpenGuide: () => void;
  onProceedToPayment: (orderData: {
    userId: string;
    zoneId: string;
    nickname: string;
    product: ProductItem;
    paymentMethod: PaymentMethod;
    whatsapp: string;
    adminFee: number;
    discount: number;
    totalPrice: number;
    voucherCode?: string;
  }) => void;
  initialUserId?: string;
  initialZoneId?: string;
}

export const TopupForm: React.FC<TopupFormProps> = ({
  onOpenGuide,
  onProceedToPayment,
  initialUserId = '',
  initialZoneId = '',
}) => {
  // Step 1: Account
  const [userId, setUserId] = useState(initialUserId);
  const [zoneId, setZoneId] = useState(initialZoneId);
  const [isVerifyingAccount, setIsVerifyingAccount] = useState(false);
  const [verifiedAccount, setVerifiedAccount] = useState<PlayerAccount | null>(null);
  const [accountError, setAccountError] = useState<string | null>(null);

  // Step 2: Product selection
  const [productCategory, setProductCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(
    MLBB_PRODUCTS.find((p) => p.isPopular) || MLBB_PRODUCTS[6]
  );

  // Step 3: Payment method
  const [paymentCategory, setPaymentCategory] = useState<'all' | PaymentCategory>('all');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PAYMENT_METHODS[0]);

  // Step 4: Contact & Voucher
  const [whatsapp, setWhatsapp] = useState('');
  const [voucherInput, setVoucherInput] = useState('');
  const [activeVoucher, setActiveVoucher] = useState<PromoVoucher | null>(null);
  const [voucherError, setVoucherError] = useState<string | null>(null);
  const [formSubmitError, setFormSubmitError] = useState<string | null>(null);

  // Update if initial props change
  React.useEffect(() => {
    if (initialUserId) setUserId(initialUserId);
    if (initialZoneId) setZoneId(initialZoneId);
  }, [initialUserId, initialZoneId]);

  // Verify account function
  const handleVerifyAccount = () => {
    if (!userId.trim() || !zoneId.trim()) {
      setAccountError('Mohon isi User ID dan Zone ID terlebih dahulu.');
      setVerifiedAccount(null);
      return;
    }

    if (userId.trim().length < 6 || zoneId.trim().length < 3) {
      setAccountError('User ID minimal 6 digit dan Zone ID minimal 3 digit.');
      setVerifiedAccount(null);
      return;
    }

    setIsVerifyingAccount(true);
    setAccountError(null);

    setTimeout(() => {
      setIsVerifyingAccount(false);
      const cleanUser = userId.trim();
      const cleanZone = zoneId.trim();

      if (MOCK_ACCOUNTS[cleanUser]) {
        const acc = MOCK_ACCOUNTS[cleanUser];
        setVerifiedAccount({
          userId: cleanUser,
          zoneId: cleanZone,
          nickname: acc.nickname,
          level: acc.level,
          rank: acc.rank,
          verified: true,
        });
      } else {
        // Realistic simulated account detection for any valid ID
        const generatedNickname = `Hero~Player${cleanUser.slice(-4)}`;
        setVerifiedAccount({
          userId: cleanUser,
          zoneId: cleanZone,
          nickname: generatedNickname,
          level: 78,
          rank: 'Mythic',
          verified: true,
        });
      }
    }, 600);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    if (productCategory === 'all') return MLBB_PRODUCTS;
    if (productCategory === 'diamonds') {
      return MLBB_PRODUCTS.filter((p) => p.category === 'diamonds');
    }
    if (productCategory === 'weekly_pass') {
      return MLBB_PRODUCTS.filter((p) => p.category === 'weekly_pass');
    }
    if (productCategory === 'starlight') {
      return MLBB_PRODUCTS.filter((p) => p.category === 'starlight');
    }
    return MLBB_PRODUCTS;
  }, [productCategory]);

  // Filter payment methods
  const filteredPayments = useMemo(() => {
    if (paymentCategory === 'all') return PAYMENT_METHODS;
    return PAYMENT_METHODS.filter((pm) => pm.category === paymentCategory);
  }, [paymentCategory]);

  // Calculations
  const basePrice = selectedProduct.price;
  const adminFee = selectedPayment.adminFee;
  const discountAmount = useMemo(() => {
    if (!activeVoucher) return 0;
    if (basePrice < activeVoucher.minSpend) return 0;
    return activeVoucher.discountAmount;
  }, [activeVoucher, basePrice]);

  const finalTotalPrice = Math.max(0, basePrice + adminFee - discountAmount);

  // Apply Voucher
  const handleApplyVoucher = (codeToApply?: string) => {
    const targetCode = (codeToApply || voucherInput).trim().toUpperCase();
    setVoucherError(null);

    if (!targetCode) {
      setVoucherError('Masukkan kode promo');
      return;
    }

    const found = PROMO_VOUCHERS.find((v) => v.code === targetCode);
    if (!found) {
      setVoucherError('Kode promo tidak valid atau telah kedaluwarsa');
      setActiveVoucher(null);
      return;
    }

    if (basePrice < found.minSpend) {
      setVoucherError(`Minimal pembelian ${formatRupiah(found.minSpend)} untuk promo ini`);
      setActiveVoucher(null);
      return;
    }

    setActiveVoucher(found);
    setVoucherInput(found.code);
  };

  const handleRemoveVoucher = () => {
    setActiveVoucher(null);
    setVoucherInput('');
    setVoucherError(null);
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitError(null);

    if (!userId.trim() || !zoneId.trim()) {
      setFormSubmitError('Silakan masukkan User ID dan Zone ID akun Anda di Langkah 1.');
      window.location.hash = 'step-1-account';
      return;
    }

    if (!whatsapp.trim() || whatsapp.trim().length < 8) {
      setFormSubmitError('Masukkan nomor WhatsApp yang valid untuk penerimaan invoice & notifikasi.');
      return;
    }

    // Determine final confirmed nickname
    const finalNickname = verifiedAccount?.nickname || `Akun MLBB (${userId.trim()})`;

    onProceedToPayment({
      userId: userId.trim(),
      zoneId: zoneId.trim(),
      nickname: finalNickname,
      product: selectedProduct,
      paymentMethod: selectedPayment,
      whatsapp: whatsapp.trim(),
      adminFee,
      discount: discountAmount,
      totalPrice: finalTotalPrice,
      voucherCode: activeVoucher?.code,
    });
  };

  // Helper icon for payment methods
  const renderPaymentIcon = (iconName: string) => {
    switch (iconName) {
      case 'QrCode':
        return <QrCode className="h-5 w-5" />;
      case 'Wallet':
        return <Wallet className="h-5 w-5" />;
      case 'Building2':
        return <Building2 className="h-5 w-5" />;
      case 'Store':
        return <Store className="h-5 w-5" />;
      case 'PhoneCall':
        return <PhoneCall className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  return (
    <section id="topup-section" className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main interactive form steps (8 cols desktop) */}
          <div className="lg:col-span-8 space-y-8">
            {/* ================= STEP 1 ================= */}
            <div id="step-1-account" className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 font-display text-sm font-bold text-neutral-950">
                    1
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold text-white tracking-wide">
                      Masukkan Data Akun Game
                    </h2>
                    <p className="text-xs text-neutral-400">
                      User ID & Zone ID akun Mobile Legends Anda
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenGuide}
                  className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Petunjuk ID</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                <div className="sm:col-span-7">
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    User ID
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Contoh: 12345678"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value.replace(/[^0-9]/g, ''));
                      setVerifiedAccount(null);
                      setAccountError(null);
                    }}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm font-mono text-white placeholder-neutral-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Zone ID (Server)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Contoh: 2134"
                      value={zoneId}
                      onChange={(e) => {
                        setZoneId(e.target.value.replace(/[^0-9]/g, ''));
                        setVerifiedAccount(null);
                        setAccountError(null);
                      }}
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm font-mono text-white placeholder-neutral-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyAccount}
                      disabled={isVerifyingAccount}
                      className="shrink-0 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 px-3.5 py-3 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
                    >
                      {isVerifyingAccount ? 'Mengecek...' : 'Cek Nick'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Error Message */}
              {accountError && (
                <div className="mt-3.5 flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-800/60 p-3 text-xs text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{accountError}</span>
                </div>
              )}

              {/* Verified Nickname Banner */}
              {verifiedAccount && (
                <div className="mt-4 rounded-xl border border-emerald-800/60 bg-emerald-950/30 p-3.5 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-150">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-900/60 text-emerald-400 border border-emerald-700/50">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-400">Nickname Terdeteksi:</span>
                        <span className="font-bold text-white text-sm">
                          {verifiedAccount.nickname}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-mono">
                        ID: {verifiedAccount.userId} ({verifiedAccount.zoneId}) · {verifiedAccount.rank} · Lv.{verifiedAccount.level}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Akun Valid & Siap Top Up
                  </span>
                </div>
              )}

              <p className="mt-3 text-[11px] text-neutral-400">
                Untuk menemukan User ID Anda, klik avatar Anda di pojok kiri atas game Mobile Legends. Contoh: 12345678 (2134).
              </p>
            </div>

            {/* ================= STEP 2 ================= */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 mb-5 gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 font-display text-sm font-bold text-neutral-950">
                    2
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold text-white tracking-wide">
                      Pilih Nominal Top Up
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Tersedia diamond satuan, pass mingguan, dan pass starlight
                    </p>
                  </div>
                </div>

                {/* Interactive Category Segmented Tabs */}
                <div className="flex items-center gap-1 p-1 bg-neutral-950 border border-neutral-800 rounded-xl overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setProductCategory('all')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      productCategory === 'all'
                        ? 'bg-amber-500 text-neutral-950'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Semua
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductCategory('diamonds')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      productCategory === 'diamonds'
                        ? 'bg-amber-500 text-neutral-950'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Diamonds
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductCategory('weekly_pass')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      productCategory === 'weekly_pass'
                        ? 'bg-amber-500 text-neutral-950'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Weekly Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductCategory('starlight')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      productCategory === 'starlight'
                        ? 'bg-amber-500 text-neutral-950'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Starlight & Twilight
                  </button>
                </div>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredProducts.map((prod) => {
                  const isSelected = selectedProduct.id === prod.id;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setSelectedProduct(prod)}
                      className={`relative flex flex-col justify-between rounded-xl p-3.5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-2 border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                          : 'border border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-900/60'
                      }`}
                    >
                      {/* Badge if available */}
                      {prod.badge && (
                        <div className="absolute -top-2.5 right-2">
                          <span className="rounded bg-gradient-to-r from-amber-500 to-amber-600 px-1.5 py-0.5 text-[10px] font-bold text-neutral-950 shadow-sm">
                            {prod.badge}
                          </span>
                        </div>
                      )}

                      {/* Header of card: Icon + Name */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800">
                            {prod.category === 'weekly_pass' ? (
                              <Sparkles className="h-4 w-4 text-amber-400" />
                            ) : prod.category === 'starlight' ? (
                              <ShieldCheck className="h-4 w-4 text-indigo-400" />
                            ) : (
                              <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4 text-cyan-400 fill-cyan-400/20"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <polygon points="12,2 22,8.5 12,22 2,8.5" />
                              </svg>
                            )}
                          </div>
                          {isSelected && (
                            <div className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-neutral-950">
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <h3 className="font-semibold text-white text-xs leading-snug">
                          {prod.name}
                        </h3>

                        {prod.bonusDiamonds > 0 && (
                          <p className="mt-0.5 text-[11px] text-cyan-400 font-mono">
                            +{prod.bonusDiamonds} Bonus DM
                          </p>
                        )}
                      </div>

                      {/* Footer: Price */}
                      <div className="mt-3 pt-2 border-t border-neutral-800/80">
                        {prod.originalPrice && (
                          <span className="block text-[10px] text-neutral-500 line-through tabular-nums">
                            {formatRupiah(prod.originalPrice)}
                          </span>
                        )}
                        <span className="text-xs sm:text-sm font-bold text-amber-400 font-mono tabular-nums">
                          {formatRupiah(prod.price)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= STEP 3 ================= */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 mb-5 gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 font-display text-sm font-bold text-neutral-950">
                    3
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold text-white tracking-wide">
                      Pilih Metode Pembayaran
                    </h2>
                    <p className="text-xs text-neutral-400">
                      QRIS otomatis, E-Wallet, Virtual Account Bank & Gerai Minimarket
                    </p>
                  </div>
                </div>

                {/* Filter payment tabs */}
                <div className="flex items-center gap-1 p-1 bg-neutral-950 border border-neutral-800 rounded-xl overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setPaymentCategory('all')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      paymentCategory === 'all'
                        ? 'bg-amber-500 text-neutral-950'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Semua
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentCategory('qris')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      paymentCategory === 'qris'
                        ? 'bg-amber-500 text-neutral-950'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    QRIS
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentCategory('ewallet')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      paymentCategory === 'ewallet'
                        ? 'bg-amber-500 text-neutral-950'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    E-Wallet
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentCategory('va')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      paymentCategory === 'va'
                        ? 'bg-amber-500 text-neutral-950'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Virtual Account
                  </button>
                </div>
              </div>

              {/* Payment Method Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredPayments.map((pm) => {
                  const isSelected = selectedPayment.id === pm.id;
                  const methodCalculatedTotal = Math.max(
                    0,
                    selectedProduct.price + pm.adminFee - discountAmount
                  );

                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setSelectedPayment(pm)}
                      className={`relative flex flex-col justify-between rounded-xl p-3.5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-2 border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                          : 'border border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900"
                            style={{ color: pm.brandColor }}
                          >
                            {renderPaymentIcon(pm.icon)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-xs leading-none">
                              {pm.name}
                            </h3>
                            <span className="text-[10px] text-neutral-400 leading-tight">
                              {pm.adminFee === 0 ? (
                                <span className="text-emerald-400 font-medium">Bebas Admin</span>
                              ) : (
                                `+${formatRupiah(pm.adminFee)} fee`
                              )}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-neutral-950">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="mt-2 pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                        <span className="text-[10px] text-neutral-400">Total:</span>
                        <span className="text-xs font-bold text-amber-400 font-mono tabular-nums">
                          {formatRupiah(methodCalculatedTotal)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= STEP 4 ================= */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4 mb-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 font-display text-sm font-bold text-neutral-950">
                  4
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold text-white tracking-wide">
                    Nomor WhatsApp & Voucher Promo
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Kirimkan bukti transaksi dan invoice resmi ke WhatsApp Anda
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp Input */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Nomor WhatsApp <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-neutral-400">
                      +62
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="81234567890"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-950 pl-12 pr-4 py-3 text-sm font-mono text-white placeholder-neutral-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-400">
                    Invoice & nomor pesanan akan otomatis terkirim.
                  </p>
                </div>

                {/* Voucher Input */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Punya Kode Promo / Voucher?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Contoh: MLBBNEW"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm font-mono uppercase text-white placeholder-neutral-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                    />
                    {activeVoucher ? (
                      <button
                        type="button"
                        onClick={handleRemoveVoucher}
                        className="shrink-0 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-800 px-3.5 py-3 text-xs font-bold text-red-300 transition-colors cursor-pointer"
                      >
                        Hapus
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApplyVoucher()}
                        className="shrink-0 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-3 text-xs font-bold text-neutral-950 transition-colors cursor-pointer"
                      >
                        Gunakan
                      </button>
                    )}
                  </div>

                  {voucherError && (
                    <p className="mt-1 text-[11px] text-red-400">{voucherError}</p>
                  )}

                  {activeVoucher && (
                    <p className="mt-1 text-[11px] text-emerald-400 font-medium">
                      Kupon {activeVoucher.code} berhasil digunakan! ({formatRupiah(activeVoucher.discountAmount)} hemat)
                    </p>
                  )}
                </div>
              </div>

              {/* Clickable available promo tags */}
              <div className="mt-4 pt-3 border-t border-neutral-800 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-neutral-400 text-[11px]">Voucher Rekomendasi:</span>
                {PROMO_VOUCHERS.map((v) => (
                  <button
                    key={v.code}
                    type="button"
                    onClick={() => handleApplyVoucher(v.code)}
                    className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-mono font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer"
                  >
                    <Tag className="h-3 w-3" />
                    <span>{v.code}</span>
                    <span className="text-neutral-400">({v.label})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ================= STICKY SUMMARY (4 cols desktop) ================= */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-neutral-800 bg-neutral-900/95 p-5 sm:p-6 shadow-xl backdrop-blur-md">
              <h3 className="font-display text-lg font-bold text-white border-b border-neutral-800 pb-3">
                Ringkasan Transaksi
              </h3>

              {/* Items details */}
              <div className="mt-4 space-y-3 text-xs">
                <div className="flex justify-between items-start">
                  <span className="text-neutral-400">Game:</span>
                  <span className="font-semibold text-white text-right">Mobile Legends: Bang Bang</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-neutral-400">Akun Tujuan:</span>
                  <div className="text-right">
                    {userId && zoneId ? (
                      <>
                        <span className="font-mono font-bold text-amber-400">
                          {userId} ({zoneId})
                        </span>
                        {verifiedAccount && (
                          <div className="text-[11px] text-emerald-400">
                            {verifiedAccount.nickname}
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-neutral-500 italic">Belum diisi</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-neutral-400">Item Dipilih:</span>
                  <div className="text-right">
                    <span className="font-bold text-white">{selectedProduct.name}</span>
                    {selectedProduct.bonusDiamonds > 0 && (
                      <div className="text-[11px] text-cyan-400">
                        +{selectedProduct.bonusDiamonds} Bonus Diamonds
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Metode Bayar:</span>
                  <span className="font-medium text-white">{selectedPayment.name}</span>
                </div>

                {whatsapp && (
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Nomor WhatsApp:</span>
                    <span className="font-mono text-neutral-300">+62 {whatsapp}</span>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="mt-5 border-t border-neutral-800 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Harga Produk:</span>
                  <span className="font-mono text-neutral-200 tabular-nums">
                    {formatRupiah(basePrice)}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Biaya Layanan Admin:</span>
                  <span className="font-mono text-neutral-200 tabular-nums">
                    {adminFee === 0 ? 'Gratis (Rp 0)' : formatRupiah(adminFee)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Potongan Kupon ({activeVoucher?.code}):</span>
                    <span className="font-mono tabular-nums">-{formatRupiah(discountAmount)}</span>
                  </div>
                )}

                <div className="border-t border-neutral-800 pt-3 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total Pembayaran:</span>
                  <span className="font-display text-2xl font-black text-amber-400 tabular-nums">
                    {formatRupiah(finalTotalPrice)}
                  </span>
                </div>
              </div>

              {/* Form submit error notice */}
              {formSubmitError && (
                <div className="mt-4 rounded-lg bg-red-950/50 border border-red-800 p-3 text-xs text-red-300 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
                  <span>{formSubmitError}</span>
                </div>
              )}

              {/* Primary Action Button */}
              <button
                type="submit"
                className="mt-5 w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 px-4 text-center font-display text-base font-bold text-neutral-950 shadow-lg shadow-amber-500/25 hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer active:scale-[0.98] whitespace-nowrap"
              >
                Beli Sekarang ({formatRupiah(finalTotalPrice)})
              </button>

              {/* Security trust badges */}
              <div className="mt-4 space-y-2 border-t border-neutral-800/80 pt-4 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>100% Legal Moonton & Garansi Anti Banned</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>Otomatis Masuk 1-3 Detik Tanpa Password</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
