'use client';

import { useEffect } from 'react';

interface PurchaseTrackerProps {
  orderId: string;
  totalAmount: number;
  items: {
    productId: string;
    quantity: number;
  }[];
}

const PurchaseTracker = ({
  orderId,
  totalAmount,
  items,
}: PurchaseTrackerProps) => {
  useEffect(() => {
    if (!orderId) return;

    if (typeof window === 'undefined' || !window.fbq) {
      return;
    }

    const storageKey = `meta-purchase-${orderId}`;

    // Prevent duplicate Purchase event
    if (localStorage.getItem(storageKey)) {
      return;
    }

    const contentIds = items.map(item => item.productId);

    const numItems = items.reduce((total, item) => total + item.quantity, 0);

    window.fbq('track', 'Purchase', {
      content_ids: contentIds,
      content_type: 'product',
      value: Number(totalAmount),
      currency: 'BDT',
      num_items: numItems,
    });

    localStorage.setItem(storageKey, 'true');
  }, [orderId, totalAmount, items]);

  return null;
};

export default PurchaseTracker;
