'use client';

import { useEffect } from 'react';

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
  useEffect(() => {
    if (!transactionId || !items?.length) return;

    trackPurchase({
      transactionId,
      value,
      shipping,

      items: items.map(item => ({
        item_id: item.productId,
        item_name: item.name,

        price: Number(item.price),
        quantity: Number(item.quantity),

        item_category: item.category || '',
        item_brand: item.brand || '',
        item_variant: item.variant || '',
        item_size: item.size || '',
        item_color: item.color || '',
      })),

      customer,
    });
  }, [transactionId, value, shipping, items, customer]);

  return null;
};

export default PurchaseEvent;
