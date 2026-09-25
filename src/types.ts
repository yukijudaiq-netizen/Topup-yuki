export type ProductCategory = 'all' | 'diamonds' | 'weekly_pass' | 'starlight' | 'promo';

export interface ProductItem {
  id: string;
  name: string;
  category: 'diamonds' | 'weekly_pass' | 'starlight' | 'promo';
  diamonds: number;
  bonusDiamonds: number;
  price: number; // in IDR
  originalPrice?: number;
  isPopular?: boolean;
  isBestValue?: boolean;
  badge?: string;
  description?: string;
}

export type PaymentCategory = 'qris' | 'ewallet' | 'va' | 'retail' | 'pulsa';

export interface PaymentMethod {
  id: string;
  name: string;
  category: PaymentCategory;
  adminFee: number;
  icon: string;
  brandColor: string;
  tagline: string;
  isInstant: boolean;
}

export type OrderStatus = 'menunggu_pembayaran' | 'memproses' | 'sukses' | 'gagal';

export interface Order {
  orderId: string;
  userId: string;
  zoneId: string;
  nickname: string;
  product: ProductItem;
  paymentMethod: PaymentMethod;
  whatsapp: string;
  basePrice: number;
  adminFee: number;
  discount: number;
  totalPrice: number;
  voucherCode?: string;
  createdAt: string;
  status: OrderStatus;
  qrisPayload?: string;
  vaNumber?: string;
}

export interface PromoVoucher {
  code: string;
  discountAmount: number;
  minSpend: number;
  label: string;
  description: string;
}

export interface PlayerAccount {
  userId: string;
  zoneId: string;
  nickname: string;
  level: number;
  rank: string;
  verified: boolean;
}
