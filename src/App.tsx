/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Order, ProductItem, PaymentMethod } from './types';
import {
  generateOrderId,
  generateMockVaNumber,
  saveOrderToStorage,
  getStoredOrders,
} from './utils/format';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveTransactionsTicker } from './components/LiveTransactionsTicker';
import { TopupForm } from './components/TopupForm';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';
import { IdGuideModal } from './components/IdGuideModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';

export default function App() {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [recentOrdersCount, setRecentOrdersCount] = useState(0);

  // Prefilled account from guide simulation
  const [prefilledUser, setPrefilledUser] = useState('');
  const [prefilledZone, setPrefilledZone] = useState('');

  // Update order count on mount
  useEffect(() => {
    const orders = getStoredOrders();
    setRecentOrdersCount(orders.length);
  }, []);

  const handleOrderCreated = (orderData: {
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
  }) => {
    const newOrder: Order = {
      orderId: generateOrderId(),
      userId: orderData.userId,
      zoneId: orderData.zoneId,
      nickname: orderData.nickname,
      product: orderData.product,
      paymentMethod: orderData.paymentMethod,
      whatsapp: orderData.whatsapp,
      basePrice: orderData.product.price,
      adminFee: orderData.adminFee,
      discount: orderData.discount,
      totalPrice: orderData.totalPrice,
      voucherCode: orderData.voucherCode,
      createdAt: new Date().toISOString(),
      status: 'menunggu_pembayaran',
      vaNumber:
        orderData.paymentMethod.category === 'va'
          ? generateMockVaNumber(orderData.paymentMethod.id)
          : undefined,
    };

    saveOrderToStorage(newOrder);
    setActiveOrder(newOrder);
    setRecentOrdersCount((prev) => prev + 1);
  };

  const handleSelectExistingOrder = (order: Order) => {
    setActiveOrder(order);
  };

  const handleApplySampleId = (userId: string, zoneId: string) => {
    setPrefilledUser(userId);
    setPrefilledZone(zoneId);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        recentOrdersCount={recentOrdersCount}
      />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenGuide={() => setIsGuideOpen(true)} />

        {/* Live Social Proof Activity Ticker */}
        <LiveTransactionsTicker />

        {/* The Core 4-Step Top Up Application Form */}
        <TopupForm
          onOpenGuide={() => setIsGuideOpen(true)}
          onProceedToPayment={handleOrderCreated}
          initialUserId={prefilledUser}
          initialZoneId={prefilledZone}
        />

        {/* Player Testimonials & Community Proof */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Interactive Payment Gateway Modal */}
      <PaymentModal
        order={activeOrder}
        onClose={() => setActiveOrder(null)}
        onOrderUpdated={() => {
          setRecentOrdersCount(getStoredOrders().length);
        }}
      />

      {/* ID Finding Guide Modal */}
      <IdGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onSelectSampleId={handleApplySampleId}
      />

      {/* Order Tracker / Invoice History Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        onSelectOrder={handleSelectExistingOrder}
      />
    </div>
  );
}
