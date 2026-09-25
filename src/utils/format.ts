import { Order } from '../types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `MLBB-${dateStr}-${randomSuffix}`;
}

export function generateMockVaNumber(bank: string): string {
  const prefixes: Record<string, string> = {
    'bca-va': '80777',
    'mandiri-va': '88908',
    'bri-va': '77890',
    'bni-va': '98800',
  };
  const prefix = prefixes[bank] || '88800';
  const random = Math.floor(100000000 + Math.random() * 900000000);
  return `${prefix}${random}`;
}

export function generatePaymentCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const STORAGE_KEY = 'mythic_topup_orders_mlbb';

export function saveOrderToStorage(order: Order): void {
  try {
    const existing = getStoredOrders();
    const updated = [order, ...existing.filter((o) => o.orderId !== order.orderId)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 30)));
  } catch (err) {
    console.error('Error saving order', err);
  }
}

export function getStoredOrders(): Order[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading orders', err);
    return [];
  }
}

export function updateOrderStatusInStorage(orderId: string, status: Order['status']): void {
  try {
    const existing = getStoredOrders();
    const updated = existing.map((o) => (o.orderId === orderId ? { ...o, status } : o));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error updating order', err);
  }
}
