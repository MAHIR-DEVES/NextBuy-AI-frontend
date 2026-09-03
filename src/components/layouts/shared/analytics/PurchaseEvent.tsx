'use client';

import { useEffect, useRef } from 'react';
import { trackPurchase } from './events';

interface PurchaseEventProps {
  transactionId: string;
  value: number;
  shipping: number;

  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;

    category?: string;
    brand?: string;
    variant?: string;
    size?: string;
    color?: string;
  }[];

  customer?: {
    external_id?: string;
    first_name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
}

const PurchaseEvent = ({
  transactionId,
  value,
  shipping,
  items,
  customer,
}: PurchaseEventProps) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!transactionId || !items?.length) return;

    // Prevent duplicate purchase event
    if (hasTracked.current) return;

    hasTracked.current = true;

    trackPurchase({
      transactionId,
      value,
      shipping,

      items: items.map(item => ({
        item_id: item.productId,
        item_name: item.name,

        price: Number(item.price),
        quantity: Number(item.quantity),

        ...(item.category ? { item_category: item.category } : {}),

        ...(item.brand ? { item_brand: item.brand } : {}),

        ...(item.variant ? { item_variant: item.variant } : {}),

        ...(item.size ? { item_size: item.size } : {}),

        ...(item.color ? { item_color: item.color } : {}),
      })),

      customer,
    });
  }, [transactionId, value, shipping, items, customer]);

  return null;
};

export default PurchaseEvent;
